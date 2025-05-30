export const getJobApplicationEmailTemplate = (job) => {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
         max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff;">
      
      <h1 style="text-align: center; color: #333333; font-size: 28px; font-weight: 500; margin-bottom: 40px;">
        Job Application Confirmation
      </h1>
      
      <div style="background-color: #fafbfc; padding: 30px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #0066ff; font-size: 20px; font-weight: 500; margin: 0 0 20px 0;">
          ${job.title} at ${job.company}
          </h2>
          
          <div style="color: #666666; font-size: 16px; line-height: 1.6;">
          <p style="margin: 0 0 20px 0;">Dear Student,</p>
          <p style="margin: 0 0 20px 0;">You have successfully applied for this position. Here are the important details:</p>
          
          <div style="background-color: #ffffff; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <div style="margin-bottom: 12px;">
              <span style="color: #888888;">Location:</span>
              <span style="color: #333333; margin-left: 8px;">${job.location}</span>
              </div>
              <div style="margin-bottom: 12px;">
              <span style="color: #888888;">Stipend:</span>
              <span style="color: #333333; margin-left: 8px;">${job.stipend || "N/A"}</span>
              </div>
              <div style="margin-bottom: 12px;">
              <span style="color: #888888;">Duration:</span>
              <span style="color: #333333; margin-left: 8px;">${job.duration}</span>
              </div>
              <div style="margin-bottom: 12px;">
              <span style="color: #888888;">OA Date:</span>
              <span style="color: #333333; margin-left: 8px;">${new Date(job.oaDate).toLocaleDateString()}</span>
              </div>
              <div style="margin-bottom: 12px;">
              <span style="color: #888888;">Interview Date:</span>
              <span style="color: #333333; margin-left: 8px;">${new Date(job.interviewDate).toLocaleDateString()}</span>
              </div>
          </div>
          
          <p style="margin: 20px 0 0 0; color: #666666;">
              Best regards,<br/>
              Career Development Cell
          </p>
          </div>
      </div>
      </div>
  `;
};