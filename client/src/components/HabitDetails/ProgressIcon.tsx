import "./ProgressIcon.scss";
import styled, { keyframes } from "styled-components";

const colorByQuarter = {
    0: 'orangered',
    1: 'orange',
    2: 'greenyellow',
    3: 'green'
}

type Props = {
	size?: number;
	percentage: number;
};

// see https://stackoverflow.com/a/53346109/12820947 for circular progress bar

const ProgressIcon = ({ size = 30, percentage }: Props) => {
	const base = "ProgressIcon";
	const dashes = 2 * Math.PI * (0.4 * size);
	const dashOffset = ((100 - percentage) / 100) * dashes;

	const buildOffset = keyframes`
    0% {
        stroke-dashoffset: ${dashes}
    } 100% {
        stroke-dashoffset: ${dashOffset}
    }
    `;

	const SVG = styled.svg`
		stroke-dasharray: ${dashes};
		stroke-dashoffset: ${dashOffset};
		animation: 750ms ${buildOffset} ease-out;
		transform: rotate(-90deg);
	`;

	return (
		<SVG className={base} height={size} width={size}>
			<circle
				className={`${base}__circle`}
				cx={size / 2}
				cy={size / 2}
				r={0.4 * size}
				stroke={colorByQuarter[String(Math.floor(percentage/25))]}
				stroke-width="6"
				fill="#333"
			/>
			{ size > 40 &&
                <text
                    className={`${base}__text`}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    x={size / 2}
                    y={size / 2}
                >
                    {percentage}%
                </text>
            }
		</SVG>
	);
};

export default ProgressIcon;
