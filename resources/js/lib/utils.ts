import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDateTime(dateString: string): string {
    const format = (window as any).DATETIME_FORMAT || 'Y-m-d H:i:s';
    const date = new Date(dateString);
    
    // Convert PHP format to JavaScript format
    return format
        .replace('Y', date.getFullYear().toString())
        .replace('m', (date.getMonth() + 1).toString().padStart(2, '0'))
        .replace('d', date.getDate().toString().padStart(2, '0'))
        .replace('H', date.getHours().toString().padStart(2, '0'))
        .replace('i', date.getMinutes().toString().padStart(2, '0'))
        .replace('s', date.getSeconds().toString().padStart(2, '0'));
}
