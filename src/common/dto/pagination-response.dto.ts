export type PaginationDto<T> = {
    data: T[];
    total: number;
    total_pages: number;
    current_page: number;
    previous_page: number|null;
    next_page: number |null ;
}