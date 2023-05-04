import ANA from "./ANA.png";
import ARI from "./ARI.png";
import BOS from "./BOS.png";
import BUF from "./BUF.png";
import CAR from "./CAR.png";
import CBJ from "./CBJ.png";
import CGY from "./CGY.png";
import CHI from "./CHI.png";
import COL from "./COL.png";
import DAL from "./DAL.png";
import DET from "./DET.png";
import EDM from "./EDM.png";
import FLA from "./FLA.png";
import LAK from "./LAK.png";
import MIN from "./MIN.png";
import MTL from "./MTL.png";
import NJD from "./NJD.png";
import NSH from "./NSH.png";
import NYI from "./NYI.png";
import NYR from "./NYR.png";
import OTT from "./OTT.png";
import PHI from "./PHI.png";
import PIT from "./PIT.png";
import SEA from "./SEA.png";
import SJS from "./SJS.png";
import STL from "./STL.png";
import TBL from "./TBL.png";
import TOR from "./TOR.png";
import VAN from "./VAN.png";
import VGK from "./VGK.png";
import WPG from "./WPG.png";
import WSH from "./WSH.png";

const MAP = {
  ANA,
  ARI,
  BOS,
  BUF,
  CAR,
  CBJ,
  CGY,
  CHI,
  COL,
  DAL,
  DET,
  EDM,
  FLA,
  LAK,
  MIN,
  MTL,
  NJD,
  NSH,
  NYI,
  NYR,
  OTT,
  PHI,
  PIT,
  SEA,
  SJS,
  STL,
  TBL,
  TOR,
  VAN,
  VGK,
  WPG,
  WSH,
};

export const get = (team) => {
  return MAP[team];
};
