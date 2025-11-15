"""
Helper script to add questions from the Google Docs document.
This script helps identify duplicates and organize questions by role.
"""

def normalize_question(question):
    """Normalize question text for duplicate detection."""
    return question.strip().lower()

def find_duplicates(existing_questions, new_questions):
    """Find duplicate questions."""
    existing_normalized = {normalize_question(q): q for q in existing_questions}
    duplicates = []
    unique_new = []
    
    for question in new_questions:
        normalized = normalize_question(question)
        if normalized in existing_normalized:
            duplicates.append(question)
        else:
            unique_new.append(question)
    
    return duplicates, unique_new

# Example usage:
if __name__ == "__main__":
    # Example: Questions from Google Docs (replace with actual questions)
    new_questions_from_doc = [
        # Add questions from the document here
        # Example:
        # 'Tell me about a time when...',
    ]
    
    # Load existing questions
    from data.static_data import get_questions
    existing_general = get_questions(None)
    
    # Find duplicates
    duplicates, unique = find_duplicates(existing_general, new_questions_from_doc)
    
    print(f"Found {len(duplicates)} duplicates:")
    for dup in duplicates:
        print(f"  - {dup}")
    
    print(f"\n{len(unique)} unique new questions:")
    for q in unique:
        print(f"  - {q}")

