import React from 'react'
import { Fact } from '../Fact'
import { FactListInterface } from '../../interfaces';

export const FactsList: React.FC<FactListInterface> = ({ facts }) => {
    return (
        <ul>
            {facts != null && facts.map((fact) => (
                <li key={fact._id}>
                    <Fact fact={fact} />
                </li>
            ))}
        </ul>
    )
}
