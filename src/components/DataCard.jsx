import { Card, Timestamp, Payload, MetaInfo, MetaItem } from "./DataCard.styles";

export default function DataCard({ item }) {
    const formatDate = (isoString) => {
        return new Date(isoString).toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    // JSON을 보기 좋게 표시
    const formatPayload = (payload) => {
        try {
            return JSON.stringify(payload, null, 2);
        } catch {
            return String(payload);
        }
    };

    return (
        <Card>
            <MetaInfo>
                <MetaItem>
                    <strong>ID:</strong> {item.id}
                </MetaItem>
                <MetaItem>
                    <strong>수집 시간:</strong> {formatDate(item.fetchedAt)}
                </MetaItem>
            </MetaInfo>
            <Payload>{formatPayload(item.payload)}</Payload>
        </Card>
    );
}
