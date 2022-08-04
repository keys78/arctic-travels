import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { filteredUsers } from '../features/admin/adminSlice'


const SearchBar = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
	const dispatch = useDispatch();
	const filterUsers = () => {
		dispatch(filteredUsers(inputRef.current?.value));
	};
	return (
		<>
			<input
				type='search'
				name='search'
				className='form-control'
				placeholder='Search user by name/email'
				ref={inputRef}
				onChange={filterUsers}
			/>
		</>
	);
};
export default SearchBar;