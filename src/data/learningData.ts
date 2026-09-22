/**
 * ============================================================================
 * DỮ LIỆU MẪU HỆ THỐNG TRỢ LÝ HỌC TẬP THPT BÙI DỤC TÀI
 * Giáo viên phụ trách: Thầy Trần Văn Bích
 * 
 * Hướng dẫn dành cho giáo viên:
 * - Bạn có thể dễ dàng thay đổi các thông tin học sinh, bài học, bài tập, điểm số
 *   và thông báo trong file này hoặc trực tiếp qua nút "Quản trị dữ liệu" trên giao diện.
 * - Dữ liệu được lưu trữ trực tiếp trên trình duyệt (Local Storage) để không bị mất khi làm bài.
 * ============================================================================
 */

import { StudentProfile, Lesson, Assignment, GradeItem, Announcement } from '../types';

export const INITIAL_STUDENT: StudentProfile = {
  name: "Nguyễn Hoàng Nam",
  studentId: "BDT-12A1-024",
  class: "12A1",
  schoolYear: "2026 - 2027",
  avatarUrl: ""
};

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: "lesson-1",
    lessonNumber: 1,
    title: "Bài 1: Cấu trúc điều khiển và Vòng lặp nâng cao trong Python",
    topic: "Lập trình căn bản & nâng cao",
    shortDesc: "Ôn tập và nâng cao về cấu trúc rẽ nhánh if-elif-else, vòng lặp for/while lồng nhau và kỹ thuật tối ưu hóa.",
    mainContent: `Trong bài học này, Thầy Bích cùng các em tìm hiểu sâu về:
1. Bản chất hoạt động của lệnh rẽ nhánh đa điều kiện trong Python.
2. Vòng lặp lồng nhau (Nested loops) và cách kiểm soát độ phức tạp thuật toán O(n^2).
3. Lệnh break, continue và khối else đi kèm vòng lặp - nét độc đáo của Python.
4. Ứng dụng giải các bài toán số học THPT: Tìm số nguyên tố, phân tích thừa số, thuật toán Euclid tìm ƯCLN.`,
    keyPoints: [
      "Hiểu rõ cú pháp và thứ tự ưu tiên các toán tử logic and, or, not.",
      "Thành thạo vòng lặp for với hàm range(start, stop, step).",
      "Biết cách ngắt vòng lặp bằng break và bỏ qua lượt bằng continue.",
      "Tối ưu vòng lặp để tránh chạy quá thời gian (TLE)."
    ],
    materials: [
      { id: "mat-1-1", title: "Slide bài giảng: Vòng lặp & Rẽ nhánh - Thầy Bích", type: "slide", sizeOrDuration: "28 Trang PDF" },
      { id: "mat-1-2", title: "Tài liệu tóm tắt công thức và sơ đồ khối thuật toán", type: "pdf", sizeOrDuration: "1.4 MB" },
      { id: "mat-1-3", title: "Video phân tích bài toán số nguyên tố (Ghi hình trên lớp)", type: "video", sizeOrDuration: "24 phút" },
      { id: "mat-1-4", title: "Mã nguồn Python ví dụ mẫu (.py)", type: "doc", sizeOrDuration: "15 KB" }
    ],
    isCompleted: true,
    durationMinutes: 45,
    recommendedWeek: "Tuần 1 - Học kỳ I"
  },
  {
    id: "lesson-2",
    lessonNumber: 2,
    title: "Bài 2: Kiểu dữ liệu danh sách (List) và Xử lý chuỗi (String)",
    topic: "Cấu trúc dữ liệu & Thuật toán",
    shortDesc: "Làm chủ các thao tác cắt lát (slicing), phương thức của List (append, pop, sort) và chuẩn hóa xâu ký tự.",
    mainContent: `Nội dung trọng tâm bài học:
1. Khái niệm List trong Python: Danh sách có thứ tự, có thể thay đổi (mutable).
2. Kỹ thuật cắt lát (Slicing): lst[start:stop:step] và thủ thuật đảo ngược danh sách lst[::-1].
3. Các phương thức quan trọng: append(), insert(), extend(), remove(), pop(), index(), count(), sort().
4. Thao tác chuẩn hóa họ tên học sinh, tách từ bằng split() và ghép chuỗi bằng join().
5. Kỹ thuật List Comprehension giúp viết mã nguồn ngắn gọn, tối ưu.`,
    keyPoints: [
      "Phân biệt chỉ số dương (0..n-1) và chỉ số âm (-n..-1).",
      "Thành thạo kỹ thuật List Comprehension: [x**2 for x in nums if x % 2 == 0].",
      "Không nhầm lẫn giữa phương thức list.sort() (tại chỗ) và hàm sorted(list).",
      "Xử lý chuỗi ký tự tiếng Việt với bảng mã Unicode UTF-8 chuẩn."
    ],
    materials: [
      { id: "mat-2-1", title: "Bài giảng điện tử: List & String chuyên sâu", type: "slide", sizeOrDuration: "35 Slide PPT" },
      { id: "mat-2-2", title: "Phiếu học tập: 15 dạng bài tập xử lý mảng và chuỗi", type: "pdf", sizeOrDuration: "2.1 MB" },
      { id: "mat-2-3", title: "Thư viện bài tập thực hành trên máy tính phòng Tin", type: "link", sizeOrDuration: "Google Drive" }
    ],
    isCompleted: true,
    durationMinutes: 90,
    recommendedWeek: "Tuần 2 - Học kỳ I"
  },
  {
    id: "lesson-3",
    lessonNumber: 3,
    title: "Bài 3: Hàm (Function) và Kỹ thuật chia để trị trong Lập trình",
    topic: "Phương pháp thiết kế chương trình",
    shortDesc: "Định nghĩa hàm def, truyền tham số, giá trị trả về return, phạm vi biến local/global và đệ quy cơ bản.",
    mainContent: `Trong bài học này Thầy Bích hướng dẫn:
1. Tư duy module hóa chương trình: Tại sao không nên viết mã lệnh thành một khối dài?
2. Cú pháp định nghĩa hàm: def ten_ham(tham_so): return gia_tri.
3. Phân biệt biến cục bộ (Local scope) và biến toàn cục (Global scope).
4. Khái niệm Đệ quy (Recursion): Điều kiện dừng (Base case) và Bước đệ quy (Recursive step).
5. Thực hành: Hàm tính n! (giai thừa), dãy số Fibonacci và thuật toán tháp Hà Nội.`,
    keyPoints: [
      "Hàm chỉ thực hiện một nhiệm vụ duy nhất (Single Responsibility).",
      "Luôn kiểm tra điều kiện dừng của hàm đệ quy để tránh đệ quy vô tận (Stack Overflow).",
      "Sử dụng docstring để chú thích mục đích và tham số của hàm."
    ],
    materials: [
      { id: "mat-3-1", title: "Slide bài giảng: Lập trình hàm và Đệ quy - Thầy Bích", type: "slide", sizeOrDuration: "30 Slide" },
      { id: "mat-3-2", title: "Sơ đồ cây đệ quy Fibonacci mẫu minh họa", type: "pdf", sizeOrDuration: "850 KB" },
      { id: "mat-3-3", title: "Code mẫu: 5 bài toán chia để trị kinh điển", type: "doc", sizeOrDuration: "20 KB" }
    ],
    isCompleted: true,
    durationMinutes: 45,
    recommendedWeek: "Tuần 3 - Học kỳ I"
  },
  {
    id: "lesson-4",
    lessonNumber: 4,
    title: "Bài 4: Thuật toán Tìm kiếm (Tìm kiếm tuần tự và Tìm kiếm nhị phân)",
    topic: "Cấu trúc dữ liệu & Thuật toán",
    shortDesc: "So sánh hiệu năng giữa Linear Search O(n) và Binary Search O(log n), điều kiện áp dụng trên mảng đã sắp xếp.",
    mainContent: `Nội dung cốt lõi của bài học:
1. Thuật toán Tìm kiếm tuần tự (Linear Search): Cơ chế duyệt từ đầu đến cuối, ưu nhược điểm.
2. Thuật toán Tìm kiếm nhị phân (Binary Search): Nguyên lý chặt đôi khoảng tìm kiếm.
3. Điều kiện tiên quyết của tìm kiếm nhị phân: Mảng bắt buộc phải được sắp xếp trước.
4. Cài đặt bằng vòng lặp while left <= right và cài đặt bằng đệ quy.
5. Ứng dụng hàm có sẵn trong module bisect của Python.`,
    keyPoints: [
      "Tìm kiếm nhị phân giảm số phép so sánh từ n xuống chỉ còn xấp xỉ log2(n).",
      "Tính toán chỉ số giữa: mid = left + (right - left) // 2 để tránh tràn số.",
      "Rèn luyện kỹ năng phân tích trường hợp tốt nhất, trung bình và xấu nhất."
    ],
    materials: [
      { id: "mat-4-1", title: "Tài liệu trực quan hóa thuật toán Binary Search", type: "pdf", sizeOrDuration: "1.8 MB" },
      { id: "mat-4-2", title: "Slide: So sánh độ phức tạp thời gian O(n) vs O(log n)", type: "slide", sizeOrDuration: "22 Trang" },
      { id: "mat-4-3", title: "Video mô phỏng thuật toán trên lớp học THPT Bùi Dục Tài", type: "video", sizeOrDuration: "18 phút" }
    ],
    isCompleted: false,
    durationMinutes: 45,
    recommendedWeek: "Tuần 4 - Học kỳ I"
  },
  {
    id: "lesson-5",
    lessonNumber: 5,
    title: "Bài 5: Các thuật toán Sắp xếp cơ bản (Đổi chỗ trực tiếp, Chèn, Nổi bọt)",
    topic: "Cấu trúc dữ liệu & Thuật toán",
    shortDesc: "Tìm hiểu nguyên lý của Interchange Sort, Insertion Sort và Bubble Sort. Minh họa từng bước tráo đổi phần tử.",
    mainContent: `Trong bài học này Thầy Bích giảng dạy:
1. Ý nghĩa của việc sắp xếp trong tổ chức và truy xuất thông tin học sinh.
2. Thuật toán Sắp xếp nổi bọt (Bubble Sort): Đưa phần tử lớn nhất 'nổi' về cuối dãy sau mỗi lượt.
3. Thuật toán Sắp xếp chọn (Selection Sort) và Sắp xếp chèn (Insertion Sort).
4. Phân tích số lần so sánh và số lần hoán đổi (swap).
5. So sánh với thuật toán Timsort đỉnh cao của hàm sort() trong Python.`,
    keyPoints: [
      "Nắm vững kỹ thuật hoán đổi hai biến: a, b = b, a.",
      "Hiểu cách đặt cờ hiệu (flag) để dừng sớm khi mảng đã có thứ tự.",
      "Vẽ được bảng trạng thái mảng sau từng bước thực thi."
    ],
    materials: [
      { id: "mat-5-1", title: "Slide bài giảng: 3 Thuật toán sắp xếp cơ bản", type: "slide", sizeOrDuration: "40 Slide" },
      { id: "mat-5-2", title: "Bảng trace thuật toán từng bước (Dành cho thi học sinh giỏi)", type: "pdf", sizeOrDuration: "1.1 MB" },
      { id: "mat-5-3", title: "Mã nguồn cài đặt 3 thuật toán", type: "doc", sizeOrDuration: "25 KB" }
    ],
    isCompleted: false,
    durationMinutes: 90,
    recommendedWeek: "Tuần 5 - Học kỳ I"
  },
  {
    id: "lesson-6",
    lessonNumber: 6,
    title: "Bài 6: Xử lý tệp dữ liệu (File I/O) và Quản lý cơ sở dữ liệu đơn giản",
    topic: "Ứng dụng thực tiễn",
    shortDesc: "Đọc/ghi tệp văn bản (.txt) và tệp bảng tính (.csv) phục vụ lưu trữ kết quả bài làm và danh sách điểm thi.",
    mainContent: `Nội dung học tập:
1. Mở file an toàn với cú pháp with open(filename, mode, encoding='utf-8') as f.
2. Các chế độ mở: 'r' (đọc), 'w' (ghi đè), 'a' (ghi nối tiếp).
3. Đọc dữ liệu dòng theo dòng với readline() và readlines().
4. Đọc/ghi cấu trúc bảng dữ liệu CSV (Comma Separated Values).
5. Ứng dụng xây dựng phần mềm quản lý điểm học sinh đơn giản cho lớp 12A1.`,
    keyPoints: [
      "Luôn chỉ định encoding='utf-8' khi làm việc với tiếng Việt.",
      "Sử dụng khối lệnh 'with open' để tệp tự động đóng, tránh rò rỉ bộ nhớ.",
      "Xử lý ngoại lệ FileNotFoundError và ValueError khi đọc số liệu từ file."
    ],
    materials: [
      { id: "mat-6-1", title: "Slide: Thao tác tệp và tổ chức dữ liệu", type: "slide", sizeOrDuration: "25 Slide" },
      { id: "mat-6-2", title: "Tệp dữ liệu mẫu diem_thi_12a1.csv", type: "doc", sizeOrDuration: "10 KB" },
      { id: "mat-6-3", title: "Đề bài dự án nhỏ Quản lý danh bạ lớp học", type: "pdf", sizeOrDuration: "500 KB" }
    ],
    isCompleted: false,
    durationMinutes: 45,
    recommendedWeek: "Tuần 6 - Học kỳ I"
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: "asg-1",
    title: "Bài tập 01: Vận dụng vòng lặp và câu lệnh rẽ nhánh",
    topic: "Chương 1 - Cơ bản",
    description: "Làm bài kiểm tra trắc nghiệm kiến thức và viết hàm kiểm tra số hoàn hảo trong Python.",
    deadline: "20/09/2026 - 23:59",
    status: "completed",
    maxScore: 10,
    score: 9.5,
    submittedAt: "19/09/2026 20:15",
    feedback: "Thầy Bích nhận xét: Em Nam làm bài rất tốt, lập luận chặt chẽ, tối ưu vòng lặp căn bậc 2 chuẩn xác.",
    questions: [
      {
        id: "q-1-1",
        question: "Trong Python, kết quả của biểu thức range(1, 10, 3) tạo ra dãy số nào?",
        options: ["1, 2, 3, 4, 5, 6, 7, 8, 9", "1, 4, 7", "1, 4, 7, 10", "3, 6, 9"],
        correctAnswer: 1,
        explanation: "range(start=1, stop=10, step=3) bắt đầu từ 1, tăng 3 đơn vị mỗi bước: 1, 1+3=4, 4+3=7. Giá trị 10 không được lấy vì giới hạn < stop."
      },
      {
        id: "q-1-2",
        question: "Lệnh nào dùng để kết thúc ngay lập tức vòng lặp hiện tại trong Python?",
        options: ["stop", "exit()", "break", "continue"],
        correctAnswer: 2,
        explanation: "Lệnh break dừng vòng lặp ngay lập tức và nhảy ra khỏi khối lặp."
      },
      {
        id: "q-1-3",
        question: "Để kiểm tra số n có chia hết cho 5 hay không, biểu thức điều kiện nào đúng?",
        options: ["n / 5 == 0", "n % 5 == 0", "n // 5 == 0", "mod(n, 5) == 0"],
        correctAnswer: 1,
        explanation: "Toán tử % trả về phần dư của phép chia. Nếu n % 5 == 0 tức là n chia hết cho 5."
      }
    ],
    essayPrompt: "Em hãy nêu ngắn gọn sự khác nhau giữa vòng lặp for và vòng lặp while trong Python?",
    studentSubmission: {
      selectedAnswers: { "q-1-1": 1, "q-1-2": 2, "q-1-3": 1 },
      essayText: "Dạ thưa Thầy Bích, vòng lặp for dùng khi ta biết trước số lần lặp (duyệt qua một tập hợp hay dải range), còn vòng lặp while dùng khi lặp lại theo một điều kiện logic cho đến khi điều kiện đó sai."
    }
  },
  {
    id: "asg-2",
    title: "Bài tập 02: Xử lý mảng (List) và Tách chuỗi ký tự",
    topic: "Chương 2 - Cấu trúc dữ liệu",
    description: "Thực hành các thao tác thêm, bớt, sắp xếp danh sách điểm và chuẩn hóa danh sách họ tên học sinh lớp 12A1.",
    deadline: "25/09/2026 - 22:00",
    status: "in_progress",
    maxScore: 10,
    score: undefined,
    submittedAt: undefined,
    feedback: "Thầy Bích nhắc: Chú ý thời hạn nộp trước tối 25/09 nhé các em.",
    questions: [
      {
        id: "q-2-1",
        question: "Cho a = [10, 20, 30, 40, 50]. Giá trị của a[-2] là bao nhiêu?",
        options: ["10", "40", "20", "50"],
        correctAnswer: 1,
        explanation: "Chỉ số âm đếm từ cuối: a[-1] là 50, a[-2] là 40."
      },
      {
        id: "q-2-2",
        question: "Phương thức nào dùng để thêm một phần tử vào cuối danh sách trong Python?",
        options: ["add()", "push()", "append()", "insert()"],
        correctAnswer: 2,
        explanation: "Phương thức append(x) nối x vào cuối danh sách."
      },
      {
        id: "q-2-3",
        question: "Cú pháp cắt lát s[1:5] trên chuỗi 'BUIDUCTAI' trả về chuỗi nào?",
        options: ["UIDU", "BUID", "UIDUC", "IDUC"],
        correctAnswer: 0,
        explanation: "Chỉ số từ 1 đến 4: ký tự tại 1 là 'U', 2 là 'I', 3 là 'D', 4 là 'U' -> 'UIDU'."
      }
    ],
    essayPrompt: "Trình bày cách sử dụng List Comprehension để lọc ra các số chẵn từ danh sách gốc A = [1, 2, 3, 4, 5, 6]?",
    studentSubmission: {
      selectedAnswers: { "q-2-1": 1 }
    }
  },
  {
    id: "asg-3",
    title: "Bài tập 03: Thiết kế Hàm tính Ước chung lớn nhất & Số Armstrong",
    topic: "Chương 3 - Hàm & Module",
    description: "Viết hàm ucln(a, b) theo thuật toán Euclid và hàm kiểm tra số Armstrong có 3 chữ số.",
    deadline: "30/09/2026 - 23:59",
    status: "not_started",
    maxScore: 10,
    score: undefined,
    submittedAt: undefined,
    feedback: "Bài tập trọng tâm phục vụ kiểm tra 1 tiết sắp tới.",
    questions: [
      {
        id: "q-3-1",
        question: "Từ khóa nào được dùng để khai báo định nghĩa một hàm mới trong Python?",
        options: ["function", "def", "func", "declare"],
        correctAnswer: 1,
        explanation: "Từ khóa 'def' bắt đầu định nghĩa hàm trong Python."
      },
      {
        id: "q-3-2",
        question: "Thuật toán Euclid tìm ƯCLN(a, b) dựa trên nguyên lý phép toán nào?",
        options: ["Phép chia lấy dư a % b", "Phép nhân", "Phép lũy thừa", "Phép căn bậc hai"],
        correctAnswer: 0,
        explanation: "Euclid: ƯCLN(a, b) = ƯCLN(b, a % b) cho tới khi số chia dư bằng 0."
      }
    ],
    essayPrompt: "Viết đoạn mã Python ngắn gọn định nghĩa hàm ucln(a, b) sử dụng thuật toán Euclid?"
  },
  {
    id: "asg-4",
    title: "Bài tập 04: Cài đặt và thực nghiệm Tìm kiếm nhị phân",
    topic: "Chương 4 - Thuật toán",
    description: "Cài đặt thuật toán Binary Search tìm vị trí học sinh theo mã định danh trong bảng danh sách đã sắp xếp.",
    deadline: "05/10/2026 - 23:59",
    status: "not_started",
    maxScore: 10,
    score: undefined,
    questions: [
      {
        id: "q-4-1",
        question: "Độ phức tạp thời gian trong trường hợp xấu nhất của thuật toán Tìm kiếm nhị phân là gì?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        correctAnswer: 2,
        explanation: "Binary search mỗi bước chia đôi không gian tìm kiếm, độ phức tạp là O(log2 n)."
      },
      {
        id: "q-4-2",
        question: "Điều kiện bắt buộc trước khi thực hiện tìm kiếm nhị phân là gì?",
        options: ["Dữ liệu phải là số nguyên", "Dãy phần tử đã được sắp xếp tăng hoặc giảm dần", "Dãy không được chứa số âm", "Kích thước mảng phải chẵn"],
        correctAnswer: 1,
        explanation: "Mảng bắt buộc phải có thứ tự để biết cần tìm tiếp ở nửa trái hay nửa phải."
      }
    ],
    essayPrompt: "Nếu một danh sách có 1000 phần tử đã sắp xếp, tìm kiếm nhị phân cần tối đa bao nhiêu lần so sánh?"
  }
];

export const INITIAL_GRADES: GradeItem[] = [
  {
    id: "gr-1",
    title: "Kiểm tra miệng: Cú pháp vòng lặp và câu lệnh rẽ nhánh",
    category: "Miệng",
    weight: 1,
    score: 9.0,
    maxScore: 10,
    date: "12/09/2026",
    status: "completed",
    note: "Trả lời lưu loát câu hỏi của Thầy Bích, hiểu sâu bản chất vòng lặp for."
  },
  {
    id: "gr-2",
    title: "Kiểm tra 15 phút số 1: Xử lý chuỗi và mảng List",
    category: "15 phút",
    weight: 1,
    score: 9.5,
    maxScore: 10,
    date: "16/09/2026",
    status: "completed",
    note: "Làm đúng 10/10 câu trắc nghiệm và viết mã giải quyết bài toán chuỗi chuẩn."
  },
  {
    id: "gr-3",
    title: "Đánh giá thực hành phòng máy: Bài tập 01",
    category: "Thực hành",
    weight: 1,
    score: 9.5,
    maxScore: 10,
    date: "19/09/2026",
    status: "completed",
    note: "Chấm trực tiếp trên máy tính: Thuật toán chạy chuẩn, thời gian phản hồi < 0.1s."
  },
  {
    id: "gr-4",
    title: "Kiểm tra 15 phút số 2: Viết hàm và tư duy module",
    category: "15 phút",
    weight: 1,
    score: 8.5,
    maxScore: 10,
    date: "22/09/2026",
    status: "completed",
    note: "Bài làm tốt, cần lưu ý biến cục bộ local scope khi dùng đệ quy."
  },
  {
    id: "gr-5",
    title: "Kiểm tra định kỳ 1 tiết (Giữa học kỳ I)",
    category: "1 tiết (Giữa kỳ)",
    weight: 2,
    score: 8.8,
    maxScore: 10,
    date: "Dự kiến: 10/10/2026",
    status: "pending",
    note: "Nội dung ôn tập từ Bài 1 đến Bài 4. Trọng số hệ số 2."
  },
  {
    id: "gr-6",
    title: "Dự án học tập cuối kỳ: Quản lý học sinh THPT Bùi Dục Tài",
    category: "Học kỳ",
    weight: 3,
    score: 9.0,
    maxScore: 10,
    date: "Dự kiến: 15/12/2026",
    status: "pending",
    note: "Dự án lập trình Python có giao diện đơn giản hoặc thao tác file dữ liệu CSV."
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "Lịch kiểm tra 15 phút số 2 và kế hoạch ôn tập giữa học kỳ I",
    content: "Chào các em học sinh lớp 12A1! Thầy Bích thông báo lịch kiểm tra 15 phút vào tiết Tin học thứ Năm tuần này. Nội dung trọng tâm tập trung vào cách khai báo và sử dụng Hàm (def) cùng kỹ thuật List Comprehension. Các em ôn lại bài tập 1 và 2 trên hệ thống trợ lý học tập này nhé.",
    date: "Hôm nay, 08:30 - 22/09/2026",
    author: "Thầy Trần Văn Bích",
    isImportant: true,
    isRead: false,
    category: "Kiểm tra"
  },
  {
    id: "ann-2",
    title: "Nhắc nhở hạn nộp Bài tập 02: Xử lý mảng (List) và Chuỗi ký tự",
    content: "Hạn chót nộp Bài tập 02 là 22:00 ngày 25/09/2026. Những em nào chưa nộp hãy chủ động bấm vào mục 'Bài tập' để hoàn thành. Thầy sẽ chấm điểm và phản hồi chi tiết trực tiếp trong hệ thống.",
    date: "21/09/2026",
    author: "Thầy Trần Văn Bích",
    isImportant: true,
    isRead: false,
    category: "Bài tập"
  },
  {
    id: "ann-3",
    title: "Phòng máy thực hành Tin học mở cửa thêm chiều thứ Bảy cho các bạn ôn thi HSG",
    content: "Để phục vụ các em đội tuyển học sinh giỏi Tin học trường THPT Bùi Dục Tài và các bạn học sinh có nhu cầu thực hành thêm trên máy, phòng máy số 2 sẽ mở cửa từ 14h00 - 17h00 thứ Bảy. Thầy Bích sẽ trực tiếp hỗ trợ giải đáp thắc mắc thuật toán nâng cao.",
    date: "18/09/2026",
    author: "Thầy Trần Văn Bích",
    isImportant: false,
    isRead: true,
    category: "Lịch học"
  },
  {
    id: "ann-4",
    title: "Chúc mừng tập thể lớp 12A1 đạt kết quả cao trong tuần lễ học tập đầu năm",
    content: "Thầy rất hoan nghênh tinh thần tự giác học tập của lớp 12A1 trong những tuần qua. Tỷ lệ hoàn thành bài học và bài tập trên hệ thống đạt 95%. Tiếp tục giữ vững phong độ này hướng tới kỳ thi tốt nghiệp THPT thật xuất sắc nhé!",
    date: "15/09/2026",
    author: "Thầy Trần Văn Bích",
    isImportant: false,
    isRead: true,
    category: "Chung"
  }
];
