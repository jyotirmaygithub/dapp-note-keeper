use ic_cdk::{export_candid, query, update};

static mut NOTE_ARRAY: Vec<String> = Vec::new();

#[update]
fn create_note(note: String) {
    unsafe {
        NOTE_ARRAY.push(note.clone());
    }
}

#[query]
fn get_notes(page: usize) -> Vec<String> {
    // Define the page size (default to 5)
    let page_size = 5;

    // Clone the NOTE_ARRAY safely
    let notes = unsafe { NOTE_ARRAY.clone() };
    ic_cdk::println!("Total number of notes = {}", notes.len());

    // Calculate the start and end indices
    let start = (page - 1) * page_size; // Calculate start index based on the page number
    let end = start + page_size; // End index

    // If start index exceeds the notes length, return an empty array
    if start >= notes.len() {
        return Vec::new();
    }

    // Ensure end does not exceed the length of notes
    let end = end.min(notes.len());

    // Create a slice of notes for the requested page
    let temp_note_array: Vec<String> = notes[start..end].to_vec();
    return temp_note_array;
}

#[update]
fn update_note(index: usize, text: String) -> Vec<String> {
    unsafe {
        if index < NOTE_ARRAY.len() {
            NOTE_ARRAY[index] = text;
        }
    }
    unsafe { NOTE_ARRAY.clone() }
}

#[update]
fn delete_note(index: usize) -> Vec<String> {
    unsafe {
        if index < NOTE_ARRAY.len() {
            NOTE_ARRAY.remove(index);
        }
    }
    unsafe { NOTE_ARRAY.clone() }
}

export_candid!();
