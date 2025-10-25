import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Calendar, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EducationCardProps {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
  description?: string;
}

const EducationCard = ({
  school,
  degree,
  field,
  startDate,
  endDate,
  gpa,
  honors,
  description,
}: EducationCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">{school}</CardTitle>
            </div>
            <p className="text-muted-foreground">{degree}</p>
            <p className="text-sm text-muted-foreground">{field}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {startDate} - {endDate}
          </span>
          {gpa && (
            <span className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              GPA: {gpa}
            </span>
          )}
        </div>
        
        {honors && honors.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Honors & Awards:</p>
            <div className="flex flex-wrap gap-2">
              {honors.map((honor, index) => (
                <Badge key={index} variant="secondary">
                  {honor}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default EducationCard;
