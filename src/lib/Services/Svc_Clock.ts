// type KV = { [key: string]: any };
interface ClockInfo {
  canvas: HTMLCanvasElement;
  skin: {
    isMetric?: boolean;
    clockFace?: string;
    hourColor?: string;
    digitColor?: string;
    tickColor?: string;
    tickWidth?: number;
    isUpright?: boolean;
    [key: string]: any; // Allow other skin properties
  };  // ctx?: CanvasRenderingContext2D; // Likely not needed in ClockInfo
}

class Svc_Clock {
	radians = Math.PI / 180;
	interval: any | null = null;
	diameter = 0;
	radius = 0;
	timeElement = { h: 0, m: 0, s: 0, ms: 0 };
	IMG: CanvasImageSource | undefined;
	CANVAS: HTMLCanvasElement | null = null;
	SKIN: Record<string, any> = {}; // More specific type for SKIN
	CTXobject: Record<string, CanvasRenderingContext2D | null> = {};
	SKINobject: Record<string, any> = {};
	CANVASobject: Record<string, HTMLCanvasElement> = {};
	idArray: string[] = [];
	CTX: CanvasRenderingContext2D | null = null;
	classicTime = { h: 0, m: 0, s: 0, ms: 0 };
	loadedImages: Record<string, HTMLImageElement> = {};
	handLength = { h: 50, m: 70, s: 95 };
	handWidth = { h: 18, m: 10, s: 1 };
	handOpacity = { h: 0.5, m: 0.7, s: 1 };
	prepped = false;

	init(clockInfo: ClockInfo) {
		clearInterval(this.interval);
		this.CANVAS = clockInfo.canvas;
		const id: string = this.CANVAS.id;
		this.CANVASobject[id] = this.CANVAS;
		this.CTXobject[id] = this.CANVAS.getContext('2d');
		this.SKINobject[id] = clockInfo.skin;
		// this.IMG = this.createColorImage("earth.webp");
		this.idArray.push(id);
		this.interval = setInterval(() => {
			this.draw();
		}, 100);
		return id;
	}

	setCanvasValue(id: string, key: string, value: any) {
		if (this.SKINobject[id]) {
			this.SKINobject[id][key] = value.toString();
		}
	}

	draw() {
		for (let x = 0; x < this.idArray.length; x++) {
			const id = this.idArray[x];
			this.CTX = this.CTXobject[id];
			if (this.CTX) {
				this.SKIN = this.SKINobject[id];
				this.diameter = this.CANVASobject[id].width;
				this.radius = this.diameter / 2;
				const currentTime = new Date();
				let hours = currentTime.getHours();
				let minutes = currentTime.getMinutes();
				let seconds = currentTime.getSeconds();
				const ms = currentTime.getMilliseconds();
				this.classicTime = { h: hours, m: minutes, s: seconds, ms: parseInt(String(ms / 10)) };

				if (this.SKIN.isMetric) {
					const numSeconds = ms / 1000 + seconds + minutes * 60 + hours * 3600;
					const metricNumSeconds = (numSeconds * 100000) / 86400 + '';
					const metricFormat = metricNumSeconds.split('.');
					let metricNumSecondsText = metricFormat[0];
					const numDigits: number = metricNumSecondsText.length;
					if (numDigits === 4) metricNumSecondsText = '00' + metricNumSecondsText;
					if (numDigits === 5) metricNumSecondsText = '0' + metricNumSecondsText;
					if (numDigits < 4) metricNumSecondsText = '000' + metricNumSecondsText;
					hours = parseInt(metricNumSecondsText.substr(0, 2));
					minutes = parseInt(metricNumSecondsText.substr(2, 2));
					seconds = parseInt(metricNumSecondsText.substr(4, 2));
				}
				this.timeElement = { h: hours, m: minutes, s: seconds, ms: ms };
				this.CTX.save();
				this.clearCanvas();
				this.drawClock();
				this.CTX.restore();
			}
		}
	}

	clearCanvas() {
		if (!this.CTX) return;
		this.CTX.clearRect(0, 0, this.diameter, this.diameter);
	}

	getRequiredAngle(handType: string) {
		const hours = this.timeElement.h;
		const minutes = this.timeElement.m;
		const seconds = this.timeElement.s;
		const hx: number[] = !this.SKIN.isMetric ? [30, 60, 3600] : [36, 100, 10000];
		const mx: number[] = !this.SKIN.isMetric ? [60, 6] : [100, 3.6];
		const sx: number = !this.SKIN.isMetric ? 6 : 3.6;
		if (handType === 'h') return hx[0] * (hours + minutes / hx[1] + seconds / hx[2]);
		if (handType === 'm') return (minutes + seconds / mx[0]) * mx[1];
		if (handType === 's') return seconds * sx;
		return 0;
	}

	rotateAndDraw(handType: string) {
		if (this.CTX) {
			const angle = this.getRequiredAngle(handType) * this.radians;
			// @ts-ignore
			this.CTX.lineWidth = this.handWidth[handType];
			this.CTX.rotate(angle);
			this.CTX.strokeStyle = 'red';
			this.CTX.beginPath();
			// @ts-ignore
			this.CTX.globalAlpha = this.handOpacity[handType];
			// @ts-ignore
			this.CTX.lineTo(0, (-this.radius * this.handLength[handType]) / 100);
			this.CTX.lineTo(0, 0);
			this.CTX.stroke();
			this.CTX.rotate(-angle);
		}
	}

	drawClock() {
		if (this.CTX) {
			this.CTX.translate(this.radius, this.radius);
			if (this.prepped) {
				this.drawFace();
				this.drawNumbers();
			}
			this.prepped = true;
			this.drawTicks();

			this.rotateAndDraw('h');
			this.rotateAndDraw('m');
			this.rotateAndDraw('s');

			if (this.SKIN.isMetric) {
				this.showDigital(
					this.rectify(this.timeElement.h) + '.' + this.rectify(this.timeElement.m) + '.' + this.rectify(this.timeElement.s)
				);
			}
			this.showDigital(this.rectify(this.classicTime.h) + ':' + this.rectify(this.classicTime.m) + ':' + this.rectify(this.classicTime.s));
		}
	}

	rectify(num: number) {
		return num < 10 ? '0' + num : num.toString();
	}

	imagine: any = undefined;

	createColorImage(obj: string): HTMLImageElement | undefined {
		if (this.imagine !== undefined) {
			return this.imagine;
		}
		const image = new Image();
		if (obj.indexOf('.') >= 0) {
			image.onload = () => {
				this.imagine = new Image();
				this.imagine.src = '/img/' + obj;
			};
			image.src = '/img/' + obj;
			return image;
		}
	}

	drawFace() {
		if (this.CTX) {
			this.CTX.save();
			this.CTX.beginPath();
			let newRadius = this.radius * 0.78;
			this.CTX.ellipse(0, 0, newRadius, newRadius, 0, 0, 2 * Math.PI);
			this.CTX.clip();
			newRadius = this.radius * 0.62;
			this.CTX.beginPath();
			this.CTX.ellipse(0, 0, newRadius, newRadius, 0, 0, 2 * Math.PI);
			this.CTX.clip();
			this.IMG = this.createColorImage('earth.webp');
			// @ts-ignore
			this.CTX.drawImage(this.IMG, -newRadius, -newRadius - 6, newRadius * 2, newRadius * 2);
			this.CTX.restore();
		}
	}

	drawNumbers() {
		let ang;
		let num;
		if (this.CTX) {
			this.CTX.beginPath();
			this.CTX.fillStyle = this.SKIN.hourColor;
			this.CTX.font = this.radius * (this.SKIN.isMetric ? 0.25 : 0.17) + 'px spice';
			this.CTX.textBaseline = 'middle';
			this.CTX.textAlign = 'center';
			for (num = this.SKIN.isMetric ? 0 : 1; num < (this.SKIN.isMetric ? 10 : 13); num++) {
				ang = num * (this.SKIN.isMetric ? 36 : 30) * this.radians;
				this.CTX.rotate(ang);
				this.CTX.translate(0, -this.radius * 0.85);
				if (this.SKIN.isUpright) this.CTX.rotate(-ang);
				this.CTX.fillText(num.toString(), 0, 0);
				if (this.SKIN.isUpright) this.CTX.rotate(ang);
				this.CTX.translate(0, this.radius * 0.85);
				this.CTX.rotate(-ang);
			}
		}
	}

	showDigital(digital: string) {
		const dual = this.SKIN.isMetric && digital.indexOf(':') >= 0;
		if (this.CTX) {
			this.CTX.beginPath();
			this.CTX.font = this.radius * (dual ? 0.07 : 0.1) + 'px almendra';
			this.CTX.textBaseline = 'middle';
			this.CTX.textAlign = 'center';
			this.CTX.translate(0, -this.radius * (dual ? 0.1 : 0.4));
			this.CTX.fillStyle = 'grey';
			this.CTX.fillText(digital, 0, 0);
			this.CTX.fillStyle = this.SKIN.digitColor;
			this.CTX.fillText(digital, 3, 3);
		}
	}

	drawTicks() {
		const start = 0;
		const end = this.SKIN.isMetric ? 10 : 12;
		if (this.CTX) {
			this.CTX.strokeStyle = this.SKIN.tickColor;
			for (let num = start; num < end; num++) {
				const angle = num * (this.SKIN.isMetric ? 36 : 30) * this.radians;
				this.CTX.globalAlpha = 0.8;
				this.CTX.lineWidth = this.SKIN.tickWidth + 10;
				this.CTX.rotate(angle);
				this.CTX.beginPath();
				this.CTX.moveTo(0, -this.radius * 0.75);
				this.CTX.lineTo(0, -this.radius * 0.69);
				this.CTX.stroke();
				this.CTX.rotate(-angle);
				for (let tiny = 0; tiny < (this.SKIN.isMetric ? 10 : 5); tiny++) {
					const angle2 = (num + tiny / (this.SKIN.isMetric ? 10 : 5)) * (this.SKIN.isMetric ? 36 : 30) * this.radians;
					this.CTX.globalAlpha = 1.0;
					this.CTX.lineWidth = 2;
					this.CTX.rotate(angle2);
					this.CTX.beginPath();
					this.CTX.moveTo(0, -this.radius * 0.75);
					this.CTX.lineTo(0, -this.radius * 0.7);
					this.CTX.stroke();
					this.CTX.rotate(-angle2);
				}
			}
		}
	}
}



  
export const clockService = new Svc_Clock();
