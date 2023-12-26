import React, {useEffect, useState} from 'react';
import {useForm, Controller, useFieldArray} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Form, Button, Col, Row} from 'react-bootstrap';
import './DeliveryForm.css'; // Add a separate CSS file for custom styles


const schema = yup.object().shape({
    senderCity: yup.string().required('Це поле обов\'язкове'),
    receiverCity: yup.string().required('Це поле обов\'язкове'),
    shipmentType: yup.string().required('Це поле обов\'язкове'),
    palletsUnits: yup.array().of(
        yup.object().shape({
            palletType: yup.string().required('Це поле обов\'язкове'),
            declaredValue: yup.number().min(0, 'Не може бути від\'ємним').required('Це поле обов\'язкове'),
            quantity: yup.number().min(1, 'Не може бути менше 1').required('Це поле обов\'язкове'),
        })
    ),
    cargoUnits: yup.array().of(
        yup.object().shape({
            quantity: yup.number().min(1, 'Не може бути менше 1').required('Це поле обов\'язкове'),
            declaredValue: yup.number().min(0, 'Не може бути від\'ємним').required('Це поле обов\'язкове'),
            weight: yup.number().min(0, 'Не може бути від\'ємним').required('Це поле обов\'язкове'),
            length: yup.number().min(0, 'Не може бути від\'ємним').required('Це поле обов\'язкове'),
            width: yup.number().min(0, 'Не може бути від\'ємним').required('Це поле обов\'язкове'),
            height: yup.number().min(0, 'Не може бути від\'ємним').required('Це поле обов\'язкове'),
        })
    ),
    packingService: yup.boolean(),
    packaging: yup.array().of(
        yup.object().shape({
            packagingType: yup.string().required('Це поле обов\'язкове'),
            quantity: yup.number().required('Це поле обов\'язкове'),
        })
    ),

    floor: yup.number(),
    elevator: yup.boolean(),
    returnService: yup.boolean(),
    returnOption: yup.string(),
    palleting: yup.boolean(),
});

const cities = ['Житомир', 'Київ', 'Вінниця', 'Хмельницький', 'Львів'];
const shipmentTypes = ['Вантажі', 'Палети'];
const palletTypes = ['Тип 1', 'Тип 2', 'Тип 3', 'Тип 4'];
const packagingTypes = ['Тип A', 'Тип B'];

const DeliveryForm = () => {
    const {handleSubmit, control, formState: {errors}, setValue, watch, reset} = useForm({
        resolver: yupResolver(schema)
    });

    const handleReturnChange = () => {
        setValue('returnService', !returnService);
    };

    const handleElevatorCheckboxChange = () => {
        setValue('elevator', !elevatorChecked);
    };

    const {fields: palletsFields, append: appendPallet, remove: removePallet} = useFieldArray({
        control,
        name: 'palletsUnits',
    });

    const {fields: cargoUnitsFields, append: appendCargoUnit, remove: removeCargoUnit} = useFieldArray({
        control,
        name: 'cargoUnits',
    });

    const handlePalletingChange = () => {
        setValue('palleting', !palleting);
    };

    const shipmentType = watch('shipmentType');
    const packingService = watch('packingService')
    const returnService = watch('returnService');
    const elevatorChecked = watch('elevator');
    const palleting = watch('palleting');

    const handleShipmentTypeChange = (type) => {
        setValue('shipmentType', type);
    }

    const handlePackingServiceChange = (value) => {
        setValue('packingService', value)
    };

    const onSubmit = (data) => {
        console.log(data);
    };

    const handleReset = () => {
        reset();
    };

    return (
        <Form className="delivery-form" onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="senderCity">
                    <Form.Label>Місто-відправник</Form.Label>
                    <Controller
                        name="senderCity"
                        control={control}
                        defaultValue=""
                        render={({field}) => (
                            <Form.Select {...field}>
                                <option key="" value="" selected="true" disabled="disabled">Оберіть місто</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </Form.Select>
                        )}
                    />
                    <Form.Text className="text-danger">{errors.senderCity?.message}</Form.Text>
                </Form.Group>

                <Form.Group as={Col} controlId="receiverCity">
                    <Form.Label>Місто-одержувач</Form.Label>
                    <Controller
                        name="receiverCity"
                        control={control}
                        defaultValue=""
                        render={({field}) => (
                            <Form.Select {...field}>
                                <option key="" value=""  selected="true" disabled="disabled">Оберіть місто</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </Form.Select>
                        )}
                    />
                    <Form.Text className="text-danger">{errors.receiverCity?.message}</Form.Text>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="shipmentType">
                    <Form.Label>Вид відправлення</Form.Label>
                    <Controller
                        name="shipmentType"
                        control={control}
                        defaultValue=""
                        render={({field}) => (
                            <Form.Select {...field} onChange={(e) => handleShipmentTypeChange(e.target.value)}>
                                <option key="" value=""  selected="true" disabled="disabled">Оберіть вид відправлення</option>
                                {shipmentTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Form.Select>
                        )}
                    />
                    <Form.Text className="text-danger">{errors.shipmentType?.message}</Form.Text>
                </Form.Group>
            </Row>

            {shipmentType === 'Палети' && (
                <>
                    {palletsFields.map((pallet, index) => (
                        <Row key={pallet.id} className="mb-3">
                            <Form.Group as={Col} controlId={`palletsUnits[${index}].palletType`}>
                                <Form.Label>Тип палети</Form.Label>
                                <Controller
                                    name={`palletsUnits[${index}].palletType`}
                                    control={control}
                                    render={({field}) => (
                                        <Form.Select {...field}>
                                            <option key="" selected="true" disabled="disabled">Оберіть тип палета
                                            </option>
                                            {palletTypes.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    )}
                                />
                                <Form.Text
                                    className="text-danger">{errors?.palletsUnits?.[index]?.palletType?.message}</Form.Text>
                            </Form.Group>

                            <Form.Group as={Col} controlId={`palletsUnits[${index}].declaredValue`}>
                                <Form.Label>Оголошена вартість</Form.Label>
                                <Controller
                                    name={`palletsUnits[${index}].declaredValue`}
                                    control={control}
                                    render={({field}) => <Form.Control {...field} type="number"/>}
                                />
                                <Form.Text
                                    className="text-danger">{errors?.palletsUnits?.[index]?.declaredValue?.message}</Form.Text>
                            </Form.Group>

                            <Form.Group as={Col} controlId={`palletsUnits[${index}].quantity`}>
                                <Form.Label>Кількість</Form.Label>
                                <Controller
                                    name={`palletsUnits[${index}].quantity`}
                                    control={control}
                                    render={({field}) => <Form.Control {...field} type="number"/>}
                                />
                                <Form.Text
                                    className="text-danger">{errors?.palletsUnits?.[index]?.quantity?.message}</Form.Text>
                            </Form.Group>

                            <Form.Group as={Col} className="d-flex align-items-end">
                                <Button variant="danger" onClick={() => removePallet(index)}>
                                    Видалити
                                </Button>
                            </Form.Group>
                        </Row>
                    ))}

                    <Button variant="success" onClick={() => appendPallet({})}>
                        Додати палету
                    </Button>
                </>
            )}

            {shipmentType === 'Вантажі' && (
                <>
                    {cargoUnitsFields.map((cargoUnit, index) => (
                        <div key={cargoUnit.id}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId={`cargoUnits[${index}].quantity`}>
                                    <Form.Label>Кількість</Form.Label>
                                    <Controller
                                        name={`cargoUnits[${index}].quantity`}
                                        control={control}
                                        render={({field}) => <Form.Control {...field} type="number"/>}
                                    />
                                    <Form.Text
                                        className="text-danger">{errors?.cargoUnits?.[index]?.quantity?.message}</Form.Text>
                                </Form.Group>

                                <Form.Group as={Col} controlId={`cargoUnits[${index}].declaredValue`}>
                                    <Form.Label>Оголошена вартість</Form.Label>
                                    <Controller
                                        name={`cargoUnits[${index}].declaredValue`}
                                        control={control}
                                        render={({field}) => <Form.Control {...field} type="number"/>}
                                    />
                                    <Form.Text
                                        className="text-danger">{errors?.cargoUnits?.[index]?.declaredValue?.message}</Form.Text>
                                </Form.Group>

                                <Form.Group as={Col} controlId={`cargoUnits[${index}].weight`}>
                                    <Form.Label>Вага (кг)</Form.Label>
                                    <Controller
                                        name={`cargoUnits[${index}].weight`}
                                        control={control}
                                        render={({field}) => <Form.Control {...field} type="number"/>}
                                    />
                                    <Form.Text
                                        className="text-danger">{errors?.cargoUnits?.[index]?.weight?.message}</Form.Text>
                                </Form.Group>

                                <Form.Group as={Col} controlId={`cargoUnits[${index}].length`}>
                                    <Form.Label>Довжина</Form.Label>
                                    <Controller
                                        name={`cargoUnits[${index}].length`}
                                        control={control}
                                        render={({field}) => <Form.Control {...field} type="number"/>}
                                    />
                                    <Form.Text
                                        className="text-danger">{errors?.cargoUnits?.[index]?.length?.message}</Form.Text>
                                </Form.Group>

                                <Form.Group as={Col} controlId={`cargoUnits[${index}].width`}>
                                    <Form.Label>Ширина</Form.Label>
                                    <Controller
                                        name={`cargoUnits[${index}].width`}
                                        control={control}
                                        render={({field}) => <Form.Control {...field} type="number"/>}
                                    />
                                    <Form.Text
                                        className="text-danger">{errors?.cargoUnits?.[index]?.width?.message}</Form.Text>
                                </Form.Group>

                                <Form.Group as={Col} controlId={`cargoUnits[${index}].height`}>
                                    <Form.Label>Висота</Form.Label>
                                    <Controller
                                        name={`cargoUnits[${index}].height`}
                                        control={control}
                                        render={({field}) => <Form.Control {...field} type="number"/>}
                                    />
                                    <Form.Text
                                        className="text-danger">{errors?.cargoUnits?.[index]?.height?.message}</Form.Text>
                                </Form.Group>

                                <Form.Group as={Col} className="d-flex align-items-end">
                                    <Button variant="danger" onClick={() => removeCargoUnit(index)}>
                                        Видалити
                                    </Button>
                                </Form.Group>
                            </Row>
                        </div>
                    ))}

                    <Button variant="success" onClick={() => appendCargoUnit({})}>
                        Додати місце
                    </Button>
                </>
            )}

            <Row className="mb-3">
                <Form.Group as={Col} controlId="packingService">
                    <Form.Label>Послуга "Пакування"</Form.Label>
                    <Form.Check
                        type="checkbox"
                        checked={packingService}
                        onChange={(e) => handlePackingServiceChange(e.target.checked)}
                    />
                    <Form.Text className="text-danger">{errors['packingService']?.message}</Form.Text>
                </Form.Group>
            </Row>

            {packingService && (
                <div>
                    <p>Список пакування</p>
                    {shipmentType === 'Палети'
                        ? palletsFields.map((field, index) => (
                            <Row className="mb-3" key={index}>
                                <Form.Group as={Col} controlId="packagingType">
                                    <Form.Label>Вид пакування</Form.Label>
                                    <Controller
                                        name={`packaging[${index}].packagingType`}
                                        control={control}
                                        defaultValue=''
                                        render={({field}) => (
                                            <Form.Select {...field} disabled={field.quantity === 0}>
                                                <option key="" value="" selected="true" disabled="disabled">Оберіть тип пакування</option>
                                                {packagingTypes.map((type) => (
                                                    <option key={type} value={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        )}
                                    />
                                    <Form.Text
                                        className="text-danger">{errors.packaging?.[index]?.packagingType?.message}</Form.Text>
                                </Form.Group>

                                <Form.Group as={Col} controlId="packingQuantity">
                                    <Form.Label>Кількість</Form.Label>
                                    <Controller disabled={true}
                                                name={`packaging[${index}].quantity`}
                                                control={control}
                                                defaultValue=''
                                                render={({field}) => (
                                                    <Form.Control {...field} type="number"/>
                                                )}
                                    /></Form.Group>
                            </Row>
                        ))
                        : shipmentType === 'Вантажі'
                            ? cargoUnitsFields.map((field, index) => (
                                <Row className="mb-3" key={index}>
                                    <Form.Group as={Col} controlId="packagingType">
                                        <Form.Label>Вид пакування</Form.Label>
                                        <Controller
                                            name={`packaging[${index}].packagingType`}
                                            control={control}
                                            defaultValue=''
                                            render={({field}) => (
                                                <Form.Select {...field} disabled={field.quantity === 0}>
                                                    <option key="" value="" selected="true" disabled="disabled">Оберіть тип пакування</option>
                                                    {packagingTypes.map((type) => (
                                                        <option key={type} value={type}>
                                                            {type}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            )}
                                        />
                                        <Form.Text
                                            className="text-danger">{errors.packaging?.[index]?.packagingType?.message}</Form.Text>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="packingQuantity">
                                        <Form.Label>Кількість</Form.Label>
                                        <Controller disabled={true}
                                                    name={`packaging[${index}].quantity`}
                                                    control={control}
                                                    defaultValue=''
                                                    render={({field}) => (
                                                        <Form.Control {...field} type="number"/>
                                                    )}
                                        /></Form.Group>
                                </Row>
                            ))
                            : null}
                </div>
            )}

            {/*Поверх і тд*/}
            <div>
                <Row className="mb-3">
                    <p>Послуга "Доставка до дверей"</p>
                    <Form.Group as={Col} controlId={`floor`}>
                        <Form.Label>Поверх</Form.Label>
                        <Controller
                            name="floor"
                            control={control}
                            render={({field}) => (
                                <Form.Control {...field} type="number"/>
                            )}
                        />
                        <p>{errors["floor"]?.message}</p>
                    </Form.Group>

                    <Form.Group as={Col} controlId={`elevator`}>
                        <Form.Label>Ліфт</Form.Label>
                        <Form.Check
                            type="checkbox"
                            checked={elevatorChecked}
                            onChange={handleElevatorCheckboxChange}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId={`return`}>
                        <Form.Label>Послуга "Зворотна доставка"</Form.Label>
                        <Form.Check
                            type="checkbox"
                            checked={returnService}
                            onChange={handleReturnChange}
                        />
                    </Form.Group>
                    {returnService && (
                        <Form.Group as={Col} controlId={`returnOption`}>
                            <Form.Label>Варіант повернення</Form.Label>
                            <Controller
                                name="returnOption"
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <Form.Select {...field}>
                                        <option value="" disabled hidden>Виберіть варіант</option>
                                        <option value="Документи">Документи</option>
                                        <option value="Грошовий переказ">Грошовий переказ</option>
                                    </Form.Select>
                                )}
                            />
                            <p>{errors["returnOption"]?.message}</p>
                        </Form.Group>
                    )}
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId={`palleting`}>
                        <Form.Label>Послуга "Палетування"</Form.Label>
                        <Form.Check
                            type="checkbox"
                            checked={palleting}
                            onChange={handlePalletingChange}
                        />
                    </Form.Group>
                </Row>
            </div>

            <Button type="submit"  className="btn-primary">Обрахувати</Button>
            <Button variant="secondary" onClick={handleReset} className="btn-secondary">
                Очистити форму
            </Button>
        </Form>
    )
        ;
};

export default DeliveryForm;