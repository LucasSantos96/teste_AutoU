def generate_response(category: str) -> str:
    if category == "productive":
        return (
            "Olá,\n\n"
            "Recebemos sua mensagem e ela já foi encaminhada para análise.\n"
            "Nossa equipe retornará com uma atualização o mais breve possível.\n\n"
            "Atenciosamente,\n"
            "Equipe de Atendimento"
        )

    return (
        "Olá,\n\n"
        "Agradecemos sua mensagem.\n"
        "No momento, não é necessária nenhuma ação adicional.\n\n"
        "Atenciosamente,\n"
        "Equipe de Atendimento"
    )
