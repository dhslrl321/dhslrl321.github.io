import { useEffect, useState } from 'react';

/**
 * 여러 시리즈를 병렬로 가져와 { [key]: {data|error} } 맵으로 반환.
 *
 * @param {{key:string, load:() => Promise<any>}[]} requests
 * @returns {{ map: Record<string,{data?:any,error?:string}>, loading: boolean }}
 */
export function useSeriesMap(requests) {
  const [map, setMap] = useState({});
  const [loading, setLoading] = useState(true);

  // 요청 키 목록이 바뀔 때만 재실행
  const depKey = requests.map(r => r.key).join('|');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    Promise.allSettled(requests.map(r => r.load())).then(results => {
      if (cancelled) return;
      const next = {};
      results.forEach((res, i) => {
        const key = requests[i].key;
        next[key] =
          res.status === 'fulfilled'
            ? { data: res.value }
            : { error: res.reason?.message ?? '불러오기 실패' };
      });
      setMap(next);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depKey]);

  return { map, loading };
}
