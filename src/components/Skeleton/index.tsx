import styled, { keyframes } from 'styled-components';

const keyFrameLoading = keyframes`
    0% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
`;

type LoadingSkeletonProps = {
  width: string;
  height: string;
};

const LoadingSkeleton = styled.div<LoadingSkeletonProps>`
    background: gray;
    border-radius: 6px;
    margin-bottom: 10px;
    min-width: ${ props => props.width };
    height: ${ props => props.height };
    animation: ${ keyFrameLoading } 500ms infinite alternate;
`;

type SkeletonProps = {
  width: string;
  height: string;
};

export function Skeleton({ width, height }:SkeletonProps) {
    return(
        <LoadingSkeleton width={ width } height={ height } />
    );
};