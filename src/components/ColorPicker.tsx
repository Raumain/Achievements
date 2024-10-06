import { useState, useCallback } from "react";

interface ColorInputProps {
	initialColor: string;
	onChange: (color: string) => void;
}

const ColorInput = ({ initialColor, onChange }: ColorInputProps) => {
	const [tempColor, setTempColor] = useState(initialColor);

	const handleColorChange = useCallback((color: string) => {
		setTempColor(color);
	}, []);

	const handleFinalColorChange = useCallback(
		(color: string) => {
			setTempColor(color);
			onChange(color);
		},
		[onChange],
	);

	return (
		<div className="flex items-center mb-2">
			<input
				type="color"
				value={tempColor}
				// onChange={(e) => handleColorChange(e.target.value)}
				onInput={(e) => handleColorChange((e.target as HTMLInputElement).value)}
				onBlur={(e) => handleFinalColorChange(e.target.value)}
				className="mr-2"
			/>
		</div>
	);
};

export default ColorInput;
