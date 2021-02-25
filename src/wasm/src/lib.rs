use wasm_bindgen::prelude::*;
extern crate whatlang;
use whatlang::{detect};

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn detect_lang(input: &str) -> String {
    return match detect(input) {
        Some(v) => v.lang().to_string(),
        None => String::from("Not detected yet")
    };
}