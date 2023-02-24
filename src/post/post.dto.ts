import { IsString, IsNotEmpty } from 'class-validator';

class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  public author: string;

  @IsString()
  @IsNotEmpty()
  public content: string;

  @IsString()
  @IsNotEmpty()
  public title: string;
}

export default CreatePostDto;
