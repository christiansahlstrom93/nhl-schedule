import { useEffect, useRef } from "react";
import "./Game.css";
import { get } from "./team-logos/ICON_MAP";

const Game = ({ game, shouldScroll }) => {
  const ref = useRef(null);
  const homeTeam = game.teams.home.team;
  const awayTeam = game.teams.away.team;
  const summary = () => {
    if (!game?.seriesSummary?.seriesStatusShort) {
      return null;
    }
    return (
      <div className="summary">
        <div>{game.seriesSummary.seriesStatusShort}</div>
        <div>{game.seriesSummary.gameLabel}</div>
      </div>
    );
  };

  useEffect(() => {
    if (shouldScroll && ref) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        inline: "end",
        block: "end",
      });
    }
  }, [ref, shouldScroll, game]);

  const isLive = game.status.detailedState.toLowerCase() === "in progress";

  const renderDate = () => {
    if (isLive) {
      return (
        <div className="liveStatus">
          <span>{game.linescore.currentPeriodOrdinal}</span>
          <span>{`${game.linescore.currentPeriodTimeRemaining}`}</span>
        </div>
      );
    }
    return (
      <div className="gameDate">
        {new Date(game.gameDate).toLocaleDateString("en-us", {
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    );
  };

  return (
    <>
      <div
        id={game.id}
        ref={ref}
        className={
          game.status.detailedState.toLowerCase() === "final"
            ? "gameContainerFinished"
            : isLive
            ? "liveContainer"
            : "gameContainer"
        }
      >
        {summary()}
        <div className="gameWrapper">
          <div className="gameBox">
            <div className="teamSection">
              <img
                className="team-logo"
                src={get(awayTeam.abbreviation)}
                alt=""
              />
              <div className="teamName">{awayTeam.abbreviation}</div>
              {game.status.detailedState.toLowerCase() === "final" || isLive ? (
                <div>{game.teams.away.score}</div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="teamSection">
              <img
                className="team-logo"
                src={get(homeTeam.abbreviation)}
                alt=""
              />
              <div className="teamName">{homeTeam.abbreviation}</div>
              {game.status.detailedState.toLowerCase() === "final" || isLive ? (
                <div>{game.teams.home.score}</div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div className="gameBox">{renderDate()}</div>
      </div>
    </>
  );
};

export default Game;
