import React, { useState, useEffect, useRef } from 'react';

const CountdownTicker = () => {
	const [value, setValue] = useState(20);
	const [hasStarted, setHasStarted] = useState(false);
	const tickerRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !hasStarted) {
					setHasStarted(true);
				}
			},
			{ threshold: 0.5 }
		);

		if (tickerRef.current) {
			observer.observe(tickerRef.current);
		}

		return () => observer.disconnect();
	}, [hasStarted]);

	useEffect(() => {
		if (!hasStarted || value <= 0) return;

		const dynamicInterval =
			value <= 1 ? 240 : value <= 5 ? 180 : value <= 10 ? 120 : value <= 15 ? 100 : 70;
		const interval = setInterval(() => {
			setValue((prev) => (prev > 0 ? prev - 1 : 0));
		}, dynamicInterval);

		return () => clearInterval(interval);
	}, [hasStarted, value]);

	return (
		<div ref={tickerRef} className="flex items-center justify-center">
			<div className="text-6xl font-bold text-indigo-900">
				£<span>{value}</span>
			</div>
		</div>
	);
};

export default CountdownTicker;
