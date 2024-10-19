import { useState } from 'react';
import styles from './index.module.scss';
import { Button } from '../button';

export const Calendar = ({ 
    onDateSelect = () => {}
}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null);

    const generateDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
        const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
        const adjustedFirstDay = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;

        const prevMonthDays = Array.from({ length: adjustedFirstDay - 1 }, (_, i) => lastDayOfPrevMonth - (adjustedFirstDay - 2) + i);
        const currentMonthDays = Array.from({ length: lastDayOfMonth }, (_, i) => i + 1);
        const remainingDays = (42 - (prevMonthDays.length + currentMonthDays.length)) % 7;
        const nextMonthDays = Array.from({ length: remainingDays }, (_, i) => i + 1);

        return {
            prevMonthDays,
            currentMonthDays,
            nextMonthDays
        };
    };

    const handleSelectedDay = (day, isCurrentMonth) => {
        let selectedDate;
        if (isCurrentMonth) {
            selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        } else {
            selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + (day > 15 ? -1 : 1), day);
        }

        setSelectedDay(selectedDate);
        onDateSelect(selectedDate); 
    };

    const { prevMonthDays, currentMonthDays, nextMonthDays } = generateDays();

    const isSelectedDay = (day, isCurrentMonth) => {
        if (!selectedDay) return false;

        const selectedYear = selectedDay.getFullYear();
        const selectedMonth = selectedDay.getMonth();
        const selectedDate = selectedDay.getDate();

        if (isCurrentMonth) {
            return (
                selectedYear === currentDate.getFullYear() &&
                selectedMonth === currentDate.getMonth() &&
                selectedDate === day
            );
        } else {
            const otherMonth = currentDate.getMonth() + (day > 15 ? -1 : 1);
            return (
                selectedYear === currentDate.getFullYear() &&
                selectedMonth === otherMonth &&
                selectedDate === day
            );
        }
    };

    return (
        <div className={styles.calendarContainer}>
            <div className={styles.calendarHeader}>
                <div className={styles.calendarHeaderYear}>
                    <Button onClick={() => setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth()))} label="Wstecz" />
                    <h2>{currentDate.getFullYear()}</h2>
                    <Button onClick={() => setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth()))} label="Dalej" />
                </div>
                <div className={styles.calendarHeaderMonth}>
                    <Button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} label="Wstecz" />
                    <h2>{currentDate.toLocaleString('default', { month: 'long' })}</h2>
                    <Button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} label="Dalej" />
                </div>
            </div>
            <div className={styles.calendarDays}>
                <div className={styles.dayName}>pon.</div>
                <div className={styles.dayName}>wt.</div>
                <div className={styles.dayName}>śr.</div>
                <div className={styles.dayName}>czw.</div>
                <div className={styles.dayName}>pt.</div>
                <div className={styles.dayName}>sob.</div>
                <div className={styles.dayName}>niedz.</div>

                {prevMonthDays.map((day, index) => (
                    <div
                        key={`prev-${index}`}
                        className={`${styles.day} ${styles.prevMonthDay} ${isSelectedDay(day, false) ? styles.daySelected : ''}`}
                        onClick={() => handleSelectedDay(day, false)}
                    >
                        {day}
                    </div>
                ))}

                {currentMonthDays.map((day, index) => (
                    <div
                        key={`current-${index}`}
                        className={`${styles.day} ${isSelectedDay(day, true) ? styles.daySelected : ''}`}
                        onClick={() => handleSelectedDay(day, true)}
                    >
                        {day}
                    </div>
                ))}

                {nextMonthDays.map((day, index) => (
                    <div
                        key={`next-${index}`}
                        className={`${styles.day} ${styles.nextMonthDay} ${isSelectedDay(day, false) ? styles.daySelected : ''}`}
                        onClick={() => handleSelectedDay(day, false)}
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};
