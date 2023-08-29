module.exports.parseNum = (num) => {
    if (num == 0) return 0;
    if (!num) return;
    let pattern = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(pattern, ",")
};

module.exports.firstWords = (str) => { // capitalize First Letter Of Each Word
    if (!str) {
        return "";
    }

    const words = str.toLowerCase().split(" ");
    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    return capitalizedWords.join(" ");
}

module.exports.parseMs = milliseconds => {
    if (typeof milliseconds !== "number") {
        throw new TypeError("Expected a number");
    }

    return {
        months: Math.trunc(milliseconds / 2629800000),
        weeks: Math.trunc(milliseconds /604800000),
		days: Math.trunc(milliseconds / 86400000),
		hours: Math.trunc(milliseconds / 3600000) % 24,
		minutes: Math.trunc(milliseconds / 60000) % 60,
		seconds: Math.trunc(milliseconds / 1000) % 60,
		milliseconds: Math.trunc(milliseconds) % 1000,
		microseconds: Math.trunc(milliseconds * 1000) % 1000,
		nanoseconds: Math.trunc(milliseconds * 1e6) % 1000
    }
}

module.exports.numToPercent = (count, total) => {
    if (typeof count !== "number" && typeof count !== "bigint" || typeof total !== "number" && typeof total !== "bigint") {
        throw new TypeError("Expected a number or a bigint");
    }

    const result = ((count / total) * 100).toFixed(2);
    if (isNaN(result)) {
        return 0;
    } else {
        return result
    }
};

module.exports.randomNumber = (num) => {
    return Math.floor(Math.random() * Math.floor(num))
}

module.exports.randomNumberLimit = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.commandPassed = (chance) => {
    return chance >= this.randomNumberLimit(1, 100);
}

module.exports.progressBar = (xpCurrent, xpMax) => {
    const progressBarLength = 20;

    const progress = xpCurrent / xpMax;
    const progressBarFilledLength = Math.round(progress * progressBarLength);
    const progressBarEmptyLength = progressBarLength - progressBarFilledLength;

    const progressBar = '▰'.repeat(progressBarFilledLength) + '▱'.repeat(progressBarEmptyLength);

    return progressBar;
}

module.exports.msToTime = (duration) => {
    const yearInMs = 1000 * 60 * 60 * 24 * 365;
    const monthInMs = 1000 * 60 * 60 * 24 * 30;
    const dayInMs = 1000 * 60 * 60 * 24;
    const hourInMs = 1000 * 60 * 60;
    const minuteInMs = 1000 * 60;
    const secondInMs = 1000;
  
    let time = duration;
    let years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0;
  
    if (typeof duration === 'string') {
        const regex = /^(\d+)([yMdhms])$/;
        const match = duration.match(regex);
      
        if (match !== null) {
            const unit = match[2];
            const amount = parseInt(match[1], 10);
            
            if (unit.toLowerCase() === 'y' || unit.toLowerCase() === 'year') {
                time = amount * yearInMs;
            } else if (unit === 'mm' || unit.toLowerCase() === 'month') {
                time = amount * monthInMs;
            } else if (unit.toLowerCase() === 'd' || unit.toLowerCase() === 'day') {
                time = amount * dayInMs;
            } else if (unit.toLowerCase() === 'h' || unit.toLowerCase() === 'hour') {
                time = amount * hourInMs;
            } else if (unit === 'm' || unit.toLowerCase() === 'minute') {
                time = amount * minuteInMs;
            } else if (unit.toLowerCase() === 's' || unit.toLowerCase() === 'second') {
                time = amount * secondInMs;
            }
        }
    }
  
    years = Math.floor(time / yearInMs);
    time -= years * yearInMs;
  
    months = Math.floor(time / monthInMs);
    time -= months * monthInMs;
  
    days = Math.floor(time / dayInMs);
    time -= days * dayInMs;
  
    hours = Math.floor(time / hourInMs);
    time -= hours * hourInMs;
  
    minutes = Math.floor(time / minuteInMs);
    time -= minutes * minuteInMs;
  
    seconds = Math.floor(time / secondInMs);
  
    let str = "";
    str += years > 0 ? `${years} year${years > 1 ? 's' : ''} ` : "";
    str += months > 0 ? `${months} month${months > 1 ? 's' : ''} ` : "";
    str += days > 0 ? `${days} day${days > 1 ? 's' : ''} ` : "";
    str += hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ` : "";
    str += minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''} ` : "";
    str += seconds > 0 ? `${seconds} second${seconds > 1 ? 's' : ''} ` : "";

    return str.trim() || "0 second"; 
};

module.exports.timeToMs = (durationString) => {
    const durationRegex = /(\d+)\s*(s|m|h|d|M|y)/g; // match digits followed by optional whitespace and s/m/h/d/M/y, ignoring "in" suffix
    const durationMap = { s: 1000, m: 60000, h: 3600000, d: 86400000, M: 2592000000, y: 31536000000 }; // map of duration units to milliseconds
    let totalMilliseconds = 0;
    let matches;
  
    while ((matches = durationRegex.exec(durationString)) !== null) {
      const [match, amount, unit] = matches;
      totalMilliseconds += amount * durationMap[unit];
    }
  
    return totalMilliseconds;
};