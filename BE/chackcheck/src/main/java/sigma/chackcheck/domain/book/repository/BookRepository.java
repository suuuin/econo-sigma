package sigma.chackcheck.domain.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sigma.chackcheck.domain.book.domain.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
}
