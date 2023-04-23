import { ArticleInfo } from '@app/classes/_classes.module';

export const BlogPageArticlesDir = 'assets/blog-page-articles/';

export const BlogPageArticles = [
  new ArticleInfo(
    /* File path   */ "2022/alexander-farewell",
    /* Title       */ "Alexander Xie - Presidental Farewell",
    /* Description */ "It's been a pleasure being the president of COGS.",
    /* Date        */ "May 9, 2022",
    /* Image Path  */ "assets/images/banner.png",
    /* Authors     */ ["Alexander Xie"],
    /* Tags        */ ["Club", "Article"],
  ),
  new ArticleInfo(
    /* File path   */ "2022/sgj-spring-2022",
    /* Title       */ "Scarlet Game Jam Spring 2022",
    /* Description */ "Recounting how scarlet game jam went.",
    /* Date        */ "April 20, 2022",
    /* Image Path  */ "assets/images/banner.png",
    /* Authors     */ ["Alan Tong"],
    /* Tags        */ ["SGJ", "event", "spring"],
  ),
  new ArticleInfo(
    /* File path   */ "2022/sgj-spring-2023",
    /* Title       */ "Scarlet Game Jam Spring 2023",
    /* Description */ "Recounting how scarlet game jam went.",
    /* Date        */ "April 22, 2023",
    /* Image Path  */ "assets/images/banner.png",
    /* Authors     */ ["Alan Tong"],
    /* Tags        */ ["SGJ", "event", "spring"],
  ),
];
