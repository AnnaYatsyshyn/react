import React from 'react';
import { Controller } from 'react-hook-form';

const CargoComponent =  ({ field, index, control, errors, remove }) => {
    return (
        <div>
            <div style={{ display: 'flex'}}>
                <label>Кількість:</label>
                <Controller
                    name="cargoQuantity"
                    control={control}
                    defaultValue=""
                    render={(field) => (
                        <input {...field} type="number" min="1" />
                    )}
                />
                <p>{errors.cargoQuantity?.message}</p>



                <label>Оголошена вартість:</label>
                <Controller
                    name="cargoDeclaredValue"
                    control={control}
                    defaultValue=""
                    render={(field ) => (
                        <input {...field} type="number" min="0" />
                    )}
                />
                <p>{errors.cargoDeclaredValue?.message}</p>



                <label>Вага:</label>
                <Controller
                    name="cargoWeight"
                    control={control}
                    defaultValue=""
                    render={(field ) => (
                        <input {...field} type="number" min="0" />
                    )}
                />
                <p>{errors.cargoWeight?.message}</p>



                <label>Довжина:</label>
                <Controller
                    name="cargoLength"
                    control={control}
                    defaultValue=""
                    render={(field)  => (
                        <input {...field} type="number" min="0" />
                    )}
                />
                <p>{errors.cargoLength?.message}</p>



                <label>Ширина:</label>
                <Controller
                    name="cargoWidth"
                    control={control}
                    defaultValue=""
                    render={(field) => (
                        <input {...field} type="number" min="0" />
                    )}
                />
                <p>{errors.cargoWidth?.message}</p>



                <label>Висота:</label>
                <Controller
                    name="cargoHeight"
                    control={control}
                    defaultValue=""
                    render={(field) => (
                        <input {...field} type="number" min="0" />
                    )}
                />
                <p>{errors.cargoHeight?.message}</p>
                <button type="button" onClick={() => remove(index)}>Видалити</button>
            </div>
        </div>
    );
};

export default CargoComponent;
