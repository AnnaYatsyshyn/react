import React from 'react';
import { Controller } from 'react-hook-form';

const RouteSelect = ({ label, name, cities, control, errors }) => {
    return (
        <div>
            <label>{label}:</label>
            <Controller
                name={name}
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <select {...field}>
                        <option value="" disabled hidden>Виберіть місто</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                )}
            />
            <p>{errors[name]?.message}</p>
        </div>
    );
};

export default RouteSelect;
