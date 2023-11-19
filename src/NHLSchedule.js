import { useEffect, useState } from "react";
import Game from "./Game";
import "./Schedule.css";

let interval;

const Schedule = (props) => {
  const { daysAgo, doScroll = true, ImageComp } = props;
  const [data, setData] = useState(null);
  const [scoreboard, setScoreboard] = useState(null);

  const fetchScoreboard = async () => {
    const response = await fetch(
      `https://api.algobook.info/api/v1/nhl/scoreboard`
    );
    const data = await response.json();
    setScoreboard(data);
  };

  const fetchSchedule = async () => {
    const startDate = new Date();
    startDate.setHours(
      startDate.getHours() - (daysAgo !== undefined ? daysAgo : 3) * 24
    );

    const response = await fetch(
      `https://api.algobook.info/api/v1/nhl/schedule/${
        startDate.toISOString().split("T")[0]
      }`
    );
    const data = await response.json();
    setData(data.gameWeek);
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const subscribe = (ms) => {
    if (interval) {
      clearInterval(interval);
    }

    interval = setInterval(() => {
      fetchScoreboard();
    }, ms);
  };

  const getScoreboard = (gameId) => {
    if (!scoreboard) {
      return null;
    }

    return scoreboard.games.find((game) => game.id === gameId);
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
      event.games.find((game) => game.gameState.toLowerCase() === "fut")
    )
    .filter((foundGames) => !!foundGames)[0];

  const anyLive = filteredData
    .map((event) =>
      event.games.find((game) => game.gameState.toLowerCase() === "live")
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
                  shouldScroll={game.id === firstLive?.id && doScroll}
                  game={game}
                  scoreboard={getScoreboard(game.id)}
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
