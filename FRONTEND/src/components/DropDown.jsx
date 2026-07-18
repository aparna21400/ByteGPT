import React from 'react'

export const DropDown = () => {
    return (
        <div className='flex flex-col dropDownProfile'>
            <ul className='flex flex-col gap-4'>
            <li>Profile</li>
            <li>Logout</li>
            <li>Share</li>
        </ul>
        </div>
    )
}
export default DropDown;