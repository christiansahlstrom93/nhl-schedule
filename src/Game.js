import { useEffect, useRef } from "react";
import "./Game.css";
import { get } from "./team-logos/ICON_MAP";

const Game = ({ game, shouldScroll, ImageComp }) => {
  const ref = useRef(null);
  const homeTeam = game.homeTeam;
  const awayTeam = game.awayTeam;
  const summary = () => {
    if (!game?.seriesStatus) {
      return null;
    }
    return (
      <div className="summary">
        <div>
          <span>{game.seriesStatus.homeTeamWins}</span>
          <span>-</span>
          <span>{game.seriesStatus.awayTeamWins}</span>
        </div>
        <div>{`Game ${game.seriesStatus.gameNumberOfSeries}`}</div>
      </div>
    );
  };

  const renderImg = (src, alt, className, style = {}) => {
    if (ImageComp) {
      return (
        <ImageComp src={src} alt={alt} className={className} style={style} />
      );
    }
    return <img src={src} alt={alt} className={className} style={style} />;
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

  const isLive = game.gameState.toLowerCase() === "in progress";

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
        {new Date(game.startTimeUTC).toLocaleDateString("en-us", {
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
          game.gameState.toLowerCase() === "off"
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
              {renderImg(get(awayTeam.abbrev), "team", "team-logo")}
              <div className="teamName">{awayTeam.abbrev}</div>
              {game.gameState.toLowerCase() === "off" || isLive ? (
                <div>{awayTeam.score}</div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="teamSection">
              {renderImg(get(homeTeam.abbrev), "team", "team-logo")}
              <div className="teamName">{homeTeam.abbrev}</div>
              {game.gameState.toLowerCase() === "off" || isLive ? (
                <div>{homeTeam.score}</div>
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
