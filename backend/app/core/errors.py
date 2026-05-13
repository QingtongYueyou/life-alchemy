from fastapi import HTTPException, status


class AppError(HTTPException):
    def __init__(self, code: str, message: str, status_code: int = 400):
        super().__init__(status_code=status_code, detail={"code": code, "message": message})


class NotFoundError(AppError):
    def __init__(self, resource: str = "资源"):
        super().__init__(
            code="NOT_FOUND",
            message=f"{resource}不存在或无权访问",
            status_code=status.HTTP_404_NOT_FOUND,
        )


class ForbiddenError(AppError):
    def __init__(self, message: str = "无权执行此操作"):
        super().__init__(
            code="FORBIDDEN",
            message=message,
            status_code=status.HTTP_403_FORBIDDEN,
        )
