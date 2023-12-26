import React from 'react';
import CargoComponent from './CargoComponent';
import { useFieldArray } from 'react-hook-form';

const CargoList = ({ control, errors }) => {
    const { fields: cargoFields, append: appendCargo, remove: removeCargo } = useFieldArray({
        control,
        name: 'cargos',
    });
    return (
        <div>
            {cargoFields.map((field, index) => (
                <CargoComponent key={index} field={field} index={index} remove={removeCargo} control={control} errors={errors}></CargoComponent>))}
            <p onClick={appendCargo}>Додати місце</p>
        </div>
    );
};

export default CargoList;