import React from 'react';
import { useDispatch } from 'react-redux';
import { returnDefaultOrder, sortAtoZ, sortZtoA } from '../features/admin/adminSlice';
import SelectBox from './SelectBox';

const SortByOrder = () => {
    const dispatch =  useDispatch()
    const options = [
        { option: 'Default' },
        { option: 'A-Z' },
        { option: 'Z-A' },
    ]

    const onClick = (val: any) => {
        val.option === "A-Z" && dispatch(sortAtoZ(val))
        val.option === "Z-A" && dispatch(sortZtoA(val))
        val.option === "Default" && dispatch(returnDefaultOrder(val))
    }

    return (
        <div>
            <SelectBox options={options} onClick={onClick} newSelected={'Default'} label={'username'} />
        </div>
    );
};

export default SortByOrder;