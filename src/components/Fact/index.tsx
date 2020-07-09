import React from 'react'
import { FactInterface } from '../../interfaces';

interface Props {
    fact: FactInterface;
}

export const Fact: React.FC<Props> = ({ fact }) => {
    return (
        <p className="gradient-border">
            {fact.text}
        </p>
    )
}
