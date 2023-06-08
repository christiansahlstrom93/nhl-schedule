declare module "nhl-schedule" {
  interface IScheduleProps {
    daysAgo?: number;
    daysAhead?: number;
    doScroll?: boolean;
    ImageComp?: any;
  }
  const NHLSchedule: (props: IScheduleProps) => JSX.Element;
}
