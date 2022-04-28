import styled, { keyframes } from "styled-components"
import colors from "../../utils/style/colors"

const rotate = keyframes`
0% {
    transform: rotate(0deg);
}
100% {
    transform: rotate(360deg);
} `

export const Loader = styled.div`
    position: relative;
    height: 0;
    width: 0;
    border: 6px solid ${colors.primary};
    border-bottom-color: transparent;
    border-top-color: transparent;
    border-radius: 50%;
    animation: ${rotate} 1s infinite linear;
    padding: 46px;
    &::after {
        content: "";
        position: absolute;
        top: 4px;
        left: 4px;
        right: 4px;
        bottom: 4px;
        border: 3px solid ${colors.secondary};
        animation: ${rotate} 10s linear infinite;
        border-bottom-color: transparent;
        border-top-color: transparent;
        padding: 36px;
        border-radius: 50%;
    }
    &::before {
        content: "";
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        border: 3px solid ${colors.secondary};
        animation: ${rotate} 10s linear infinite;
        border-bottom-color: transparent;
        border-top-color: transparent;
        padding: 36px;
        border-radius: 50%;
    }
`
