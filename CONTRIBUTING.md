# Contributing to Hamplitude

Thanks for helping. Anything that makes the site more accurate or clearer for someone learning is welcome:
a corrected fact, a sharper explanation, a better diagram, a typo, a bug fix.

* **Found a mistake?** Open an issue: <https://github.com/crueber/hamplitude/issues>. For a wrong fact, please say which page and
  what the correct value is, with a source if you have one.
* **Want to fix it yourself?** Open a pull request. Lessons live in `src/content/` and compendium articles in
  `src/compendium/content/`; **CONTENT.md** and **CONTENT-COMPENDIUM.md** describe the house style (short, concept-first, visual).
  Run `bun run validate` and `bun run build` before you push; both must pass.
* **Accuracy matters most.** People study from this for real exams, so numbers should be checked and anything uncertain softened or left out.
  The answer keys come straight from the official NCVEC pools and must not be changed.

## Get listed on the Acknowledgements page

Contributors are thanked on the [Acknowledgements page](https://hamplitude.net/acknowledgements/). In your pull request, add yourself
to `src/data/contributors.json`:

```json
[
  {
    "name": "Your Name",
    "callsign": "N0CALL",
    "url": "https://example.com/optional-link",
    "contribution": "One line on what you contributed"
  }
]
```

Only `name` is required. By contributing you agree that your contribution is released under the project's [license](LICENSE).
