import axios from "axios";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ActivityCalendar from "react-activity-calendar";
import dayjs from 'dayjs';

import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrBefore)

const getDaysBetweenDates = (startDate: any, endDate: any) => {
  let now = startDate.clone(), dates = [];

  while (now.isSameOrBefore(endDate)) {
    dates.push(now.format('YYYY-MM-DD'));
    now = now.add(1, 'day')
  }
  return dates;
};

export default function PublishersDetailPage(props: any) {
  const router = useRouter()
  const slug: any = router.query.slug;

  const publisherName = (slug || []).join('');
  const [packageList, setPackageList] = useState<Array<any>>([]);
  const [calendarDataList, setCalendarDataList] = useState<Array<any>>([]);

  useEffect(() => {
    _loadData();
  }, [publisherName]);

  const _loadData = async () => {
    if (!publisherName) return;
    var startDate = dayjs('2021-06-01');
    var endDate = dayjs('2022-06-01');

    var dateList = getDaysBetweenDates(startDate, endDate);

    const newPackageList: Array<any> = [];
    const newCalendarDataList: Array<any> = dateList.map((date) => {
      return {
        count: 0,
        date,
        level: 0
      }
    });

    let nextUrl = `/api/pubdev/search?q=publisher:${publisherName}`;

    while (nextUrl) {
      const resp = await axios.get(nextUrl);
      const packages: [any] = resp.data['packages'];

      for (let i = 0; i < packages.length; i++) {
        const packageName = packages[i]['package'];
        const resp2 = await axios.get(`/api/pubdev/packages/${packageName}`);
        newPackageList.push(resp2.data);
      }

      if (resp.data['next'] != nextUrl) {
        nextUrl = resp.data['next'];
      } else {
        break;
      }
    }

    for (let i = 0; i < newPackageList.length; i++) {
      let pubPackage = newPackageList[i];

      for (let j = 0; j < (pubPackage.versions || []).length; j++) {
        const version = pubPackage.versions[j];
        const publishedAt = dayjs(version.published).format('YYYY-MM-DD');

        const calendarDataIndex = newCalendarDataList.findIndex((e) => e.date === publishedAt);
        if (calendarDataIndex !== -1) {
          const newCount = newCalendarDataList[calendarDataIndex].count + 1;
          let newLevel = 0;
          if (newCount > 1) newLevel = 1;
          if (newCount > 2) newLevel = 2;
          if (newCount > 3) newLevel = 3;
          newCalendarDataList[calendarDataIndex].count = newCount;
          newCalendarDataList[calendarDataIndex].level = newLevel;
        }
      }
    }

    setPackageList(newPackageList);
    setCalendarDataList(newCalendarDataList);
  }

  return <div
    style={{
      flexDirection: 'column',
      width: '100vw',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <ActivityCalendar
      data={calendarDataList}
      labels={{
        legend: {
          less: 'Less',
          more: 'More'
        },
        months: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        tooltip: '<strong>{{count}} versions</strong> on {{date}}',
        totalCount: '{{count}} versions in {{year}}',
        weekdays: [
          'Sun',
          'Mon',
          'Tue',
          'Wed',
          'Thu',
          'Fri',
          'Sat'
        ]
      }}
    />
    {/* <div>
      {packageList.map((e) => {
        return <p key={e['package']}>{JSON.stringify(e)}</p>
      })}
    </div> */}
  </div>;
}
