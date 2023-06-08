import { useEffect, useState } from "react";
import Game from "./Game";
import "./Schedule.css";

let interval;

const Schedule = (props) => {
  const { daysAgo, daysAhead, doScroll = true, ImageComp } = props;
  const [data, setData] = useState(null);

  const fetchSchedule = async () => {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setHours(
      startDate.getHours() - (daysAgo !== undefined ? daysAgo : 3) * 24
    );
    endDate.setHours(
      endDate.getHours() + (daysAhead !== undefined ? daysAhead : 7) * 24
    );

    const response = await fetch(
      `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${
        startDate.toISOString().split("T")[0]
      }&endDate=${
        endDate.toISOString().split("T")[0]
      }&hydrate=team,linescore,game(content(media(epg)),seriesSummary),metadata,seriesSummary(series)&site=en_nhlNORDIC`
    );
    const data = await response.json();
    setData(data.dates);
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const subscribe = (ms) => {
    if (interval) {
      clearInterval(interval);
    }

    interval = setInterval(() => {
      fetchSchedule();
    }, ms);
  };

  if (!data) {
    return null;
  }

  const filteredData = data.map((event) => ({
    ...event,
    games: event.games,
  }));

  const firstLive = filteredData
    .map((event) =>
      event.games.find(
        (game) => game.status.detailedState.toLowerCase() === "scheduled"
      )
    )
    .filter((foundGames) => !!foundGames)[0];

  const anyLive = filteredData
    .map((event) =>
      event.games.find(
        (game) => game.status.detailedState.toLowerCase() === "in progress"
      )
    )
    .filter((foundGames) => !!foundGames)[0];

  if (anyLive) {
    subscribe(30000);
  } else if (interval) {
    subscribe(180000);
  }

  if (!filteredData.length) {
    return null;
  }

  return (
    <>
      <div className="schedule">
        {filteredData?.map((event, index) => {
          return (
            <div key={index} className="games-event">
              {event.games.map((game, idx) => (
                <Game
                  ImageComp={ImageComp}
                  shouldScroll={game.gamePk === firstLive?.gamePk && doScroll}
                  game={game}
                  key={idx}
                />
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Schedule;
