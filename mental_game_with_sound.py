
import tkinter as tk
from tkinter import messagebox
from playsound import playsound
import threading
import random
import time

class MentalMathGame:
    def __init__(self, root):
        self.root = root
        self.root.title("Mental Math Challenge")
        self.root.geometry("500x500")
        self.root.configure(bg="#f0f8ff")
        self.difficulty = None
        self.score = 0
        self.problem_count = 0
        self.total_problems = 5
        self.start_time = 0
        self.timer_id = None
        self.time_left = 10
        self.leaderboard = []

        self.create_welcome_screen()

    def create_welcome_screen(self):
        self.clear_screen()
        self.root.configure(bg="#f0f8ff")

        tk.Label(self.root, text="🧠 Mental Math Challenge 🧠", font=("Arial", 22, "bold"), bg="#f0f8ff", fg="#333").pack(pady=20)
        tk.Label(self.root, text="Choose your difficulty level:", font=("Arial", 14), bg="#f0f8ff").pack(pady=10)

        tk.Button(self.root, text="Easy (+, -)", bg="#90ee90", font=("Arial", 12), command=lambda: self.start_game("easy")).pack(pady=5)
        tk.Button(self.root, text="Medium (+, -, *)", bg="#ffa07a", font=("Arial", 12), command=lambda: self.start_game("medium")).pack(pady=5)
        tk.Button(self.root, text="Hard (+, -, *, /)", bg="#ff6347", font=("Arial", 12), command=lambda: self.start_game("hard")).pack(pady=5)

    def start_game(self, difficulty):
        self.difficulty = difficulty
        self.score = 0
        self.problem_count = 0
        self.next_problem()

    def next_problem(self):
        if self.problem_count == self.total_problems:
            self.show_result()
            return

        self.problem_count += 1
        self.num1, self.num2, self.op = self.generate_problem(self.difficulty)
        self.correct_answer = self.calculate_answer(self.num1, self.num2, self.op)
        self.start_time = time.time()
        self.time_left = 10

        self.clear_screen()
        self.root.configure(bg="#fffaf0")

        tk.Label(self.root, text=f"Score: {self.score}", font=("Arial", 14, "bold"), bg="#fffaf0", fg="#2e8b57").pack(pady=5)
        tk.Label(self.root, text=f"Problem {self.problem_count} of {self.total_problems}", font=("Arial", 14, "bold"), bg="#fffaf0").pack(pady=5)
        tk.Label(self.root, text=f"{self.num1} {self.op} {self.num2} = ?", font=("Arial", 20), bg="#fffaf0", fg="#000080").pack(pady=10)

        self.answer_entry = tk.Entry(self.root, font=("Arial", 16), justify="center", bd=3)
        self.answer_entry.pack(pady=10)
        self.answer_entry.focus()

        tk.Button(self.root, text="Submit", command=self.check_answer, bg="#4682b4", fg="white", font=("Arial", 12, "bold")).pack(pady=10)

        self.timer_label = tk.Label(self.root, text=f"⏱️ Time left: {self.time_left}s", font=("Arial", 12), bg="#fffaf0", fg="red")
        self.timer_label.pack(pady=5)

        self.update_timer()

    def update_timer(self):
        self.timer_label.config(text=f"⏱️ Time left: {self.time_left}s")
        if self.time_left > 0:
            self.time_left -= 1
            self.timer_id = self.root.after(1000, self.update_timer)
        else:
            self.check_answer(timeout=True)

    def check_answer(self, timeout=False):
        if self.timer_id:
            self.root.after_cancel(self.timer_id)

        try:
            user_input = int(self.answer_entry.get())
        except:
            user_input = None

        time_taken = time.time() - self.start_time

        if not timeout and user_input == self.correct_answer:
            points = max(1, int(10 - time_taken))
            self.score += points
            threading.Thread(target=playsound, args=("correct.mp3",), daemon=True).start()
            messagebox.showinfo("Correct", f"🎉 Well done! (+{points} points)")
        else:
            threading.Thread(target=playsound, args=("wrong.mp3",), daemon=True).start()
            messagebox.showinfo("Incorrect", f"❌ The correct answer was {self.correct_answer}")

        self.next_problem()

    def generate_problem(self, difficulty):
        operations = {
            "easy": ['+', '-'],
            "medium": ['+', '-', '*'],
            "hard": ['+', '-', '*', '/']
        }
        op = random.choice(operations[difficulty])
        num1 = random.randint(1, 20)
        num2 = random.randint(1, 20)
        if op == '/':
            num1 = num1 * num2
        return num1, num2, op

    def calculate_answer(self, num1, num2, op):
        if op == '+': return num1 + num2
        elif op == '-': return num1 - num2
        elif op == '*': return num1 * num2
        elif op == '/': return int(num1 / num2)

    def show_result(self):
        self.clear_screen()
        self.root.configure(bg="#e6ffe6")

        self.leaderboard.append(self.score)
        self.leaderboard.sort(reverse=True)
        top_scores = "\n".join([f"{i+1}. {s} pts" for i, s in enumerate(self.leaderboard[:5])])

        tk.Label(self.root, text="🏁 Game Over 🏁", font=("Arial", 20, "bold"), bg="#e6ffe6", fg="#2e8b57").pack(pady=15)
        tk.Label(self.root, text=f"Your Score: {self.score}", font=("Arial", 16), bg="#e6ffe6", fg="#006400").pack(pady=5)

        tk.Label(self.root, text="🏆 Top Scores:", font=("Arial", 14, "bold"), bg="#e6ffe6", fg="#000").pack(pady=10)
        tk.Label(self.root, text=top_scores, font=("Arial", 12), bg="#e6ffe6").pack()

        tk.Button(self.root, text="Play Again", command=self.create_welcome_screen,
                  bg="#6a5acd", fg="white", font=("Arial", 12, "bold")).pack(pady=10)

        tk.Button(self.root, text="Exit", command=self.root.quit,
                  bg="#ff6347", fg="white", font=("Arial", 12, "bold")).pack(pady=5)

    def clear_screen(self):
        for widget in self.root.winfo_children():
            widget.destroy()

# Run the app
if __name__ == "__main__":
    root = tk.Tk()
    game = MentalMathGame(root)
    root.mainloop()
