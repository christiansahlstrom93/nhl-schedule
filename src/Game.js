import { useEffect, useRef } from "react";
import "./Game.css";
import { get } from "./team-logos/ICON_MAP";

const Game = ({ game, shouldScroll, ImageComp, scoreboard }) => {
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

  const isOver = (status) => {
    return status.toLowerCase() === "off" || status.toLowerCase() === "final";
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

  const isLive = game.gameState.toLowerCase() === "live";

  const getPeriodNumber = (period) => {
    if (period === 1) {
      return "1st";
    } else if (period === 2) {
      return "2nd";
    } else if (period === 3) {
      return "3rd";
    }
    return period;
  };

  const renderDate = () => {
    if (isLive) {
      return (
        <div className="liveStatus">
          <span>{getPeriodNumber(game.periodDescriptor?.number)}</span>
          <span>{scoreboard?.clock?.timeRemaining}</span>
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
          isOver(game.gameState)
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
              {isOver(game.gameState) || isLive ? (
                <div>{awayTeam.score}</div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="teamSection">
              {renderImg(get(homeTeam.abbrev), "team", "team-logo")}
              <div className="teamName">{homeTeam.abbrev}</div>
              {isOver(game.gameState) || isLive ? (
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
