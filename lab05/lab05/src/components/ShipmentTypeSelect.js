import React from 'react';
import { Controller } from 'react-hook-form';

const ShipmentTypeSelect = ({ label, name, options, control, errors }) => {
    return (
        <div>
            <label>{label}:</label>
            <Controller
                name={name}
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <select {...field}>
                        <option value="" disabled hidden>Виберіть вид відправлення</option>
                        {options.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                )}
            />
            <p>{errors[name]?.message}</p>
        </div>
    );
};

export default ShipmentTypeSelect;
