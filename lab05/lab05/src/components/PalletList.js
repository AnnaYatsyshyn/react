import React from 'react';
import PalletComponent from './PalletComponent';
import { useFieldArray } from 'react-hook-form';

const PalletList = ({ control, errors }) => {
    const { fields: paletteFields, append: appendPalette, remove: removePalette } = useFieldArray({
        control,
        name: 'palettes',
    });
    return (
        <div>
            {paletteFields.map((field, index) => (
                <PalletComponent key={index} field={field} index={index} remove={removePalette} control={control} errors={errors}></PalletComponent>))}
            <p onClick={appendPalette}>Додати місце</p>
        </div>
    );
};

export default PalletList;
