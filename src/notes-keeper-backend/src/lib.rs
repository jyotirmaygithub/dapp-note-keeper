use ic_cdk::{export_candid, query, update};

static mut NOTE_ARRAY: Vec<String> = Vec::new();

#[update]
fn create_note(note: String) {
    unsafe {
        // By cloning, you make sure that any data stored in a structure like a vector is independent of the original. This avoids unintended side effects if you later modify the data elsewhere.
        NOTE_ARRAY.push(note.clone());
        ic_cdk::println!("Created note: {}", note);
        ic_cdk::println!("array of the note {:?}", NOTE_ARRAY);
    }
}

#[query]
fn get_notes() -> Vec<String> {
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
