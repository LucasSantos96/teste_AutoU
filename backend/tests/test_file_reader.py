from app.services.file_reader import read_file

def test_read_txt():
    content = read_file(
        "email.txt",
        b"Este e um email de teste"
    )

    assert "email de teste" in content
