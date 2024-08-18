"use client";

import Calendar from "@/components/calendar";
import MiniCalendar from "@/components/mini_calendar";
import Header from "@/components/header";
import styled from '@emotion/styled';

export default function Home() {
  return (
    <styles.displayWrapper>
      <Header/>
      <styles.fullCalendarWrapper>
        <MiniCalendar/>
        <Calendar/>
      </styles.fullCalendarWrapper>
    </styles.displayWrapper>
  );
}

const styles = {
  displayWrapper: styled.div`
    height: 100vh;
    background-color: #fff;
    margin: 0;
    display: flex;
    flex-direction: column;
  `,
  fullCalendarWrapper: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
  `
}