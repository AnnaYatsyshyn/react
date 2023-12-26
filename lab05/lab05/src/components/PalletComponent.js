import React from 'react';
import { Controller } from 'react-hook-form';

const PalletComponent = ({ field, index, control, errors, remove }) => {
    return (
        <div>
            <div style={{ display: 'flex' }} index='index'>
                <label>Тип палети:</label>
                <Controller
                    name="palletType"
                    control={control}
                    defaultValue=""
                    render={(field) => (
                        <select {...field}>
                            <option value="" disabled hidden>Виберіть тип палети</option>
                            <option value="type1">Тип 1</option>
                            <option value="type2">Тип 2</option>
                            <option value="type3">Тип 3</option>
                            <option value="type4">Тип 4</option>
                        </select>
                    )}
                />
                <p>{errors.palletType?.message}</p>

                <label>Оголошена вартість:</label>
                <Controller
                    name="palletDeclaredValue"
                    control={control}
                    defaultValue=""
                    render={(field) => (
                        <input {...field} type="number" min="0" />
                    )}
                />
                <p>{errors.palletDeclaredValue?.message}</p>

                <label>Кількість:</label>
                <Controller
                    name="palletQuantity"
                    control={control}
                    defaultValue=""
                    render={(field) => (
                        <input {...field} type="number" min="1" />
                    )}
                />
                <p>{errors.palletQuantity?.message}</p>
                <button type="button" onClick={() => remove(index)}>Видалити</button>
            </div>
        </div>
    );
};

export default PalletComponent;
