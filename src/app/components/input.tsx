import * as React from 'react';
import styled from '@emotion/styled';

export default function Input({type, min = '', max = '', value}) {
    var FigmaInput = styled.input``;

    return <FigmaInput type={type} value={value} min={min} max={max} />;
}
