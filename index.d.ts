declare module "nhl-schedule" {
  interface IScheduleProps {
    daysAgo?: number;
    daysAhead?: number;
    doScroll?: boolean;
  }
  const NHLSchedule: (props: IScheduleProps) => JSX.Element;
}
