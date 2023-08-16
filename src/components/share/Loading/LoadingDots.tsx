import { styled } from "styled-components";

const LoadingDotsStyle = styled.div`
    display: inline-flex;
    align-items: center;
    .spacer {
        margin-right: 2px;
    }
    span {
        animation-name: blink;
        animation-duration: 1.4s;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        display: inline-block;
        margin: 0 1px;
    }
    span:nth-of-type(2) {
        animation-delay: 0.2s;
    }
    span:nth-of-type(3) {
        animation-delay: 0.4s;
    }

    @keyframes blink {
        0% {
            opacity: 0.2;
        }
        20% {
            opacity: 1;
        }
        100% {
            opacity: 0.2;
        }
    }

`

const LoadingDots = ({ color = "#000" }: { color?: string }) => {
    return (
        <LoadingDotsStyle>
            <span style={{ backgroundColor: color }} />
            <span style={{ backgroundColor: color }} />
            <span style={{ backgroundColor: color }} />
        </LoadingDotsStyle>
    );
};

export default LoadingDots;
