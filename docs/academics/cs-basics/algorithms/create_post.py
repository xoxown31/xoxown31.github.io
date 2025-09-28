import os
import shutil
import sys
from datetime import datetime

def create_algorithm_post():
    """알고리즘 문제 풀이 포스트를 템플릿으로부터 생성합니다."""
    
    # 템플릿 파일 경로
    template_path = "template.md"
    
    # 사용자로부터 정보 입력받기
    print("🚀 알고리즘 문제 풀이 포스트 생성기")
    print("=" * 50)
    
    platform = input("플랫폼 (예: BOJ, LeetCode, Programmers): ").strip()
    number = input("문제 번호: ").strip()
    title = input("문제 제목: ").strip()
    link = input("문제 링크: ").strip()
    difficulty = input("난이도 (예: Gold 3, Medium, Level 2): ").strip()
    keywords = input("키워드 (쉼표로 구분): ").strip()
    
    # 파일명 생성
    filename = f"{platform.lower()}{number}.md"
    
    # nav_order 자동 계산 (기존 파일 개수 + 1)
    current_dir = os.path.dirname(os.path.abspath(__file__))
    md_files = [f for f in os.listdir(current_dir) if f.endswith('.md') and f != 'template.md']
    nav_order = len(md_files) + 1 - 2 # 템플릿 파일, 부모 파일 제외
    
    # 템플릿 읽기
    try:
        with open(template_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"❌ 템플릿 파일 '{template_path}'을 찾을 수 없습니다.")
        return
    
    # 플레이스홀더 교체
    replacements = {
        '[PLATFORM]': platform,
        '[NUMBER]': number,
        '[TITLE]': title,
        '[LINK]': link,
        '[ORDER]': str(nav_order),
        '[DIFFICULTY]': difficulty,
        '[KEYWORDS]': keywords,
        '[DESCRIPTION]': '',
        '[APPROACH_DESCRIPTION]': '',
        '[WRONG_APPROACH]': '브루트포스',
        '[WRONG_APPROACH_DETAILS]': '',
        '[TIME_COMPLEXITY]': '',
        '[CORRECT_APPROACH]': '',
        '[CORRECT_APPROACH_DETAILS]': '',
        '[KEY_POINTS]': '',
        '[TIP_1]': '',
        '[TIP_2]': '',
        '[LANGUAGE]': 'python',
        '[CODE]': '',
        '[SUMMARY_POINT_1]': '',
        '[SUMMARY_POINT_2]': '',
        '[SUMMARY_POINT_3]': ''
    }
    
    for placeholder, value in replacements.items():
        content = content.replace(placeholder, value)
    
    # 새 파일 생성
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ '{filename}' 파일이 성공적으로 생성되었습니다!")
        print(f"📝 이제 내용을 채워넣으세요.")
    except Exception as e:
        print(f"❌ 파일 생성 중 오류가 발생했습니다: {e}")

if __name__ == "__main__":
    create_algorithm_post()