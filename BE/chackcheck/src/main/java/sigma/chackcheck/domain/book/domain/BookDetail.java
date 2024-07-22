package sigma.chackcheck.domain.book.domain;

import static jakarta.persistence.FetchType.*;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;


@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE book_detail SET deleted = true WHERE book_detail_id = ?")
@Where(clause = "deleted = false")
public class BookDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private boolean borrowStatus;
    private boolean reserveStatus;
    private boolean deleted;

    @ManyToOne(fetch = LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "book_id")
    private Book book;
}
