
export function generateOtp(){
    return '' + Math.floor(100000 + Math.random() * 900000);
}

export function generateExpiry(){
    return new Date(Date.now() + 5 * 60 * 1000);
}